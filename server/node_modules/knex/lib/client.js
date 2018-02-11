'use strict';

exports.__esModule = true;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _defaults2 = require('lodash/defaults');

var _defaults3 = _interopRequireDefault(_defaults2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

var _raw = require('./raw');

var _raw2 = _interopRequireDefault(_raw);

var _runner = require('./runner');

var _runner2 = _interopRequireDefault(_runner);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _transaction = require('./transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _builder = require('./query/builder');

var _builder2 = _interopRequireDefault(_builder);

var _compiler = require('./query/compiler');

var _compiler2 = _interopRequireDefault(_compiler);

var _builder3 = require('./schema/builder');

var _builder4 = _interopRequireDefault(_builder3);

var _compiler3 = require('./schema/compiler');

var _compiler4 = _interopRequireDefault(_compiler3);

var _tablebuilder = require('./schema/tablebuilder');

var _tablebuilder2 = _interopRequireDefault(_tablebuilder);

var _tablecompiler = require('./schema/tablecompiler');

var _tablecompiler2 = _interopRequireDefault(_tablecompiler);

var _columnbuilder = require('./schema/columnbuilder');

var _columnbuilder2 = _interopRequireDefault(_columnbuilder);

var _columncompiler = require('./schema/columncompiler');

var _columncompiler2 = _interopRequireDefault(_columncompiler);

var _genericPool = require('generic-pool');

var genericPool = _interopRequireWildcard(_genericPool);

var _errors = require('generic-pool/lib/errors');

var genericPoolErrors = _interopRequireWildcard(_errors);

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _events = require('events');

var _string = require('./query/string');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('knex:client');
var debugQuery = require('debug')('knex:query');
var debugBindings = require('debug')('knex:bindings');

var id = 0;
function clientId() {
  return 'client' + id++;
}

// The base client provides the general structure
// for a dialect specific client object.
function Client() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.config = config;

  //Client is a required field, so throw error if it's not supplied.
  //If 'this.dialect' is set, then this is a 'super()' call, in which case
  //'client' does not have to be set as it's already assigned on the client prototype.
  if (!this.config.client && !this.dialect) {
    throw new Error('knex: Required configuration option \'client\' is missing.');
  }

  this.connectionSettings = (0, _cloneDeep3.default)(config.connection || {});
  if (this.driverName && config.connection) {
    this.initializeDriver();
    if (!config.pool || config.pool && config.pool.max !== 0) {
      this.__cid = clientId();
      this.initializePool(config);
    }
  }
  this.valueForUndefined = this.raw('DEFAULT');
  if (config.useNullAsDefault) {
    this.valueForUndefined = null;
  }
}
(0, _inherits2.default)(Client, _events.EventEmitter);

(0, _assign3.default)(Client.prototype, {
  formatter: function formatter() {
    return new _formatter2.default(this);
  },
  queryBuilder: function queryBuilder() {
    return new _builder2.default(this);
  },
  queryCompiler: function queryCompiler(builder) {
    return new _compiler2.default(this, builder);
  },
  schemaBuilder: function schemaBuilder() {
    return new _builder4.default(this);
  },
  schemaCompiler: function schemaCompiler(builder) {
    return new _compiler4.default(this, builder);
  },
  tableBuilder: function tableBuilder(type, tableName, fn) {
    return new _tablebuilder2.default(this, type, tableName, fn);
  },
  tableCompiler: function tableCompiler(tableBuilder) {
    return new _tablecompiler2.default(this, tableBuilder);
  },
  columnBuilder: function columnBuilder(tableBuilder, type, args) {
    return new _columnbuilder2.default(this, tableBuilder, type, args);
  },
  columnCompiler: function columnCompiler(tableBuilder, columnBuilder) {
    return new _columncompiler2.default(this, tableBuilder, columnBuilder);
  },
  runner: function runner(builder) {
    return new _runner2.default(this, builder);
  },
  transaction: function transaction(container, config, outerTx) {
    return new _transaction2.default(this, container, config, outerTx);
  },
  raw: function raw() {
    var _ref;

    return (_ref = new _raw2.default(this)).set.apply(_ref, arguments);
  },
  _formatQuery: function _formatQuery(sql, bindings, timeZone) {
    var _this = this;

    bindings = bindings == null ? [] : [].concat(bindings);
    var index = 0;
    return sql.replace(/\\?\?/g, function (match) {
      if (match === '\\?') {
        return '?';
      }
      if (index === bindings.length) {
        return match;
      }
      var value = bindings[index++];
      return _this._escapeBinding(value, { timeZone: timeZone });
    });
  },


  _escapeBinding: (0, _string.makeEscape)({
    escapeString: function escapeString(str) {
      return '\'' + str.replace(/'/g, "''") + '\'';
    }
  }),

  query: function query(connection, obj) {
    var _this2 = this;

    if (typeof obj === 'string') obj = { sql: obj };
    obj.sql = this.positionBindings(obj.sql);
    obj.bindings = this.prepBindings(obj.bindings);
    debugQuery(obj.sql);
    this.emit('query', (0, _assign3.default)({ __knexUid: connection.__knexUid }, obj));
    debugBindings(obj.bindings);
    return this._query(connection, obj).catch(function (err) {
      err.message = _this2._formatQuery(obj.sql, obj.bindings) + ' - ' + err.message;
      _this2.emit('query-error', err, (0, _assign3.default)({ __knexUid: connection.__knexUid }, obj));
      throw err;
    });
  },
  stream: function stream(connection, obj, _stream, options) {
    if (typeof obj === 'string') obj = { sql: obj };
    obj.sql = this.positionBindings(obj.sql);
    obj.bindings = this.prepBindings(obj.bindings);
    this.emit('query', (0, _assign3.default)({ __knexUid: connection.__knexUid }, obj));
    debugQuery(obj.sql);
    debugBindings(obj.bindings);
    return this._stream(connection, obj, _stream, options);
  },
  prepBindings: function prepBindings(bindings) {
    return bindings;
  },
  positionBindings: function positionBindings(sql) {
    return sql;
  },
  postProcessResponse: function postProcessResponse(resp) {
    if (this.config.postProcessResponse) {
      return this.config.postProcessResponse(resp);
    }
    return resp;
  },
  wrapIdentifier: function wrapIdentifier(value) {
    if (this.config.wrapIdentifier) {
      return this.config.wrapIdentifier(value, this.wrapIdentifierImpl);
    }
    return this.wrapIdentifierImpl(value);
  },
  wrapIdentifierImpl: function wrapIdentifierImpl(value) {
    return value !== '*' ? '"' + value.replace(/"/g, '""') + '"' : '*';
  },
  initializeDriver: function initializeDriver() {
    try {
      this.driver = this._driver();
    } catch (e) {
      helpers.exit('Knex: run\n$ npm install ' + this.driverName + ' --save\n' + e.stack);
    }
  },
  poolDefaults: function poolDefaults() {
    return { min: 2, max: 10, testOnBorrow: true, Promise: _bluebird2.default };
  },
  getPoolSettings: function getPoolSettings(poolConfig) {
    var _this3 = this;

    poolConfig = (0, _defaults3.default)({}, poolConfig, this.poolDefaults());
    var timeoutValidator = function timeoutValidator(config, path) {
      var timeout = (0, _get3.default)(config, path);
      if (timeout !== undefined) {
        timeout = parseInt(timeout, 10);
        if (isNaN(timeout) || timeout <= 0) {
          throw new Error(path + ' must be a positive int');
        }
      }
      return timeout;
    };

    // acquire connection timeout can be set on config or config.pool
    // choose the smallest, positive timeout setting and set on poolConfig
    var timeouts = [timeoutValidator(this.config, 'acquireConnectionTimeout') || 60000, timeoutValidator({ pool: poolConfig }, 'pool.acquireTimeoutMillis')].filter(function (timeout) {
      return timeout !== undefined;
    });
    poolConfig.acquireTimeoutMillis = Math.min.apply(Math, timeouts);

    return {
      config: poolConfig,
      factory: {
        create: function create() {
          return _this3.acquireRawConnection().tap(function (connection) {
            connection.__knexUid = (0, _uniqueId3.default)('__knexUid');
            if (poolConfig.afterCreate) {
              return _bluebird2.default.promisify(poolConfig.afterCreate)(connection);
            }
          }).catch(function (err) {
            // Acquire connection must never reject, because generic-pool
            // will retry trying to get connection until acquireConnectionTimeout is
            // reached. acquireConnectionTimeout should trigger in knex only 
            // in that case if aquiring connection waits because pool is full
            // https://github.com/coopernurse/node-pool/pull/184
            // https://github.com/tgriesser/knex/issues/2325
            return {
              genericPoolMissingRetryCountHack: true,
              __knex__disposed: err,
              query: function query() {
                throw err; // pass error to query
              }
            };
          });
        },
        destroy: function destroy(connection) {
          if (connection.genericPoolMissingRetryCountHack) {
            return;
          }
          if (poolConfig.beforeDestroy) {
            helpers.warn('\n              beforeDestroy is deprecated, please open an issue if you use this\n              to discuss alternative apis\n            ');
            poolConfig.beforeDestroy(connection, function () {});
          }
          if (connection !== void 0) {
            return _this3.destroyRawConnection(connection);
          }

          return _bluebird2.default.resolve();
        },
        validate: function validate(connection) {
          if (connection.__knex__disposed) {
            helpers.warn('Connection Error: ' + connection.__knex__disposed);
            return _bluebird2.default.resolve(false);
          }
          return _this3.validateConnection(connection);
        }
      }
    };
  },
  initializePool: function initializePool(config) {
    if (this.pool) {
      helpers.warn('The pool has already been initialized');
      return;
    }

    var poolSettings = this.getPoolSettings(config.pool);

    this.pool = genericPool.createPool(poolSettings.factory, poolSettings.config);
  },
  validateConnection: function validateConnection(connection) {
    return _bluebird2.default.resolve(true);
  },


  // Acquire a connection from the pool.
  acquireConnection: function acquireConnection() {
    if (!this.pool) {
      return _bluebird2.default.reject(new Error('Unable to acquire a connection'));
    }
    return this.pool.acquire().tap(function (connection) {
      debug('acquired connection from pool: %s', connection.__knexUid);
    }).catch(genericPoolErrors.TimeoutError, function () {
      throw new _bluebird2.default.TimeoutError('Knex: Timeout acquiring a connection. The pool is probably full. ' + 'Are you missing a .transacting(trx) call?');
    });
  },


  // Releases a connection back to the connection pool,
  // returning a promise resolved when the connection is released.
  releaseConnection: function releaseConnection(connection) {
    debug('releasing connection to pool: %s', connection.__knexUid);
    return this.pool.release(connection).catch(function () {
      debug('pool refused connection: %s', connection.__knexUid);
    });
  },


  // Destroy the current connection pool for the client.
  destroy: function destroy(callback) {
    var _this4 = this;

    return _bluebird2.default.resolve(this.pool && this.pool.drain().then(function () {
      return _this4.pool.clear();
    }).then(function () {
      _this4.pool = void 0;
      if (typeof callback === 'function') {
        callback();
      }
    }));
  },


  // Return the database being used by this client.
  database: function database() {
    return this.connectionSettings.database;
  },
  toString: function toString() {
    return '[object KnexClient]';
  },


  canCancelQuery: false,

  assertCanCancelQuery: function assertCanCancelQuery() {
    if (!this.canCancelQuery) {
      throw new Error("Query cancelling not supported for this dialect");
    }
  },
  cancelQuery: function cancelQuery() {
    throw new Error("Query cancelling not supported for this dialect");
  }
});

exports.default = Client;
module.exports = exports['default'];