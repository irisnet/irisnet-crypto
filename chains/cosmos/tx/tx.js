/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.cosmos = (function() {

    /**
     * Namespace cosmos.
     * @exports cosmos
     * @namespace
     */
    var cosmos = {};

    cosmos.Coin = (function() {

        /**
         * Properties of a Coin.
         * @memberof cosmos
         * @interface ICoin
         * @property {string} denom Coin denom
         * @property {string} amount Coin amount
         */

        /**
         * Constructs a new Coin.
         * @memberof cosmos
         * @classdesc Represents a Coin.
         * @implements ICoin
         * @constructor
         * @param {cosmos.ICoin=} [properties] Properties to set
         */
        function Coin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Coin denom.
         * @member {string} denom
         * @memberof cosmos.Coin
         * @instance
         */
        Coin.prototype.denom = "";

        /**
         * Coin amount.
         * @member {string} amount
         * @memberof cosmos.Coin
         * @instance
         */
        Coin.prototype.amount = "";

        /**
         * Creates a new Coin instance using the specified properties.
         * @function create
         * @memberof cosmos.Coin
         * @static
         * @param {cosmos.ICoin=} [properties] Properties to set
         * @returns {cosmos.Coin} Coin instance
         */
        Coin.create = function create(properties) {
            return new Coin(properties);
        };

        /**
         * Encodes the specified Coin message. Does not implicitly {@link cosmos.Coin.verify|verify} messages.
         * @function encode
         * @memberof cosmos.Coin
         * @static
         * @param {cosmos.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.denom);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.Coin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.Coin
         * @static
         * @param {cosmos.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.Coin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("denom"))
                throw $util.ProtocolError("missing required 'denom'", { instance: message });
            if (!message.hasOwnProperty("amount"))
                throw $util.ProtocolError("missing required 'amount'", { instance: message });
            return message;
        };

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Coin message.
         * @function verify
         * @memberof cosmos.Coin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Coin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.denom))
                return "denom: string expected";
            if (!$util.isString(message.amount))
                return "amount: string expected";
            return null;
        };

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.Coin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.Coin} Coin
         */
        Coin.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.Coin)
                return object;
            var message = new $root.cosmos.Coin();
            if (object.denom != null)
                message.denom = String(object.denom);
            if (object.amount != null)
                message.amount = String(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.Coin
         * @static
         * @param {cosmos.Coin} message Coin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Coin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.denom = "";
                object.amount = "";
            }
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this Coin to JSON.
         * @function toJSON
         * @memberof cosmos.Coin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Coin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Coin;
    })();

    cosmos.MsgSend = (function() {

        /**
         * Properties of a MsgSend.
         * @memberof cosmos
         * @interface IMsgSend
         * @property {Uint8Array} FromAddress MsgSend FromAddress
         * @property {Uint8Array} ToAddress MsgSend ToAddress
         * @property {Array.<cosmos.ICoin>|null} [Amount] MsgSend Amount
         */

        /**
         * Constructs a new MsgSend.
         * @memberof cosmos
         * @classdesc Represents a MsgSend.
         * @implements IMsgSend
         * @constructor
         * @param {cosmos.IMsgSend=} [properties] Properties to set
         */
        function MsgSend(properties) {
            this.Amount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSend FromAddress.
         * @member {Uint8Array} FromAddress
         * @memberof cosmos.MsgSend
         * @instance
         */
        MsgSend.prototype.FromAddress = $util.newBuffer([]);

        /**
         * MsgSend ToAddress.
         * @member {Uint8Array} ToAddress
         * @memberof cosmos.MsgSend
         * @instance
         */
        MsgSend.prototype.ToAddress = $util.newBuffer([]);

        /**
         * MsgSend Amount.
         * @member {Array.<cosmos.ICoin>} Amount
         * @memberof cosmos.MsgSend
         * @instance
         */
        MsgSend.prototype.Amount = $util.emptyArray;

        /**
         * Creates a new MsgSend instance using the specified properties.
         * @function create
         * @memberof cosmos.MsgSend
         * @static
         * @param {cosmos.IMsgSend=} [properties] Properties to set
         * @returns {cosmos.MsgSend} MsgSend instance
         */
        MsgSend.create = function create(properties) {
            return new MsgSend(properties);
        };

        /**
         * Encodes the specified MsgSend message. Does not implicitly {@link cosmos.MsgSend.verify|verify} messages.
         * @function encode
         * @memberof cosmos.MsgSend
         * @static
         * @param {cosmos.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.FromAddress);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ToAddress);
            if (message.Amount != null && message.Amount.length)
                for (var i = 0; i < message.Amount.length; ++i)
                    $root.cosmos.Coin.encode(message.Amount[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link cosmos.MsgSend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.MsgSend
         * @static
         * @param {cosmos.IMsgSend} message MsgSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.MsgSend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.FromAddress = reader.bytes();
                    break;
                case 2:
                    message.ToAddress = reader.bytes();
                    break;
                case 3:
                    if (!(message.Amount && message.Amount.length))
                        message.Amount = [];
                    message.Amount.push($root.cosmos.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("FromAddress"))
                throw $util.ProtocolError("missing required 'FromAddress'", { instance: message });
            if (!message.hasOwnProperty("ToAddress"))
                throw $util.ProtocolError("missing required 'ToAddress'", { instance: message });
            return message;
        };

        /**
         * Decodes a MsgSend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.MsgSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.MsgSend} MsgSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSend message.
         * @function verify
         * @memberof cosmos.MsgSend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!(message.FromAddress && typeof message.FromAddress.length === "number" || $util.isString(message.FromAddress)))
                return "FromAddress: buffer expected";
            if (!(message.ToAddress && typeof message.ToAddress.length === "number" || $util.isString(message.ToAddress)))
                return "ToAddress: buffer expected";
            if (message.Amount != null && message.hasOwnProperty("Amount")) {
                if (!Array.isArray(message.Amount))
                    return "Amount: array expected";
                for (var i = 0; i < message.Amount.length; ++i) {
                    var error = $root.cosmos.Coin.verify(message.Amount[i]);
                    if (error)
                        return "Amount." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.MsgSend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.MsgSend} MsgSend
         */
        MsgSend.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.MsgSend)
                return object;
            var message = new $root.cosmos.MsgSend();
            if (object.FromAddress != null)
                if (typeof object.FromAddress === "string")
                    $util.base64.decode(object.FromAddress, message.FromAddress = $util.newBuffer($util.base64.length(object.FromAddress)), 0);
                else if (object.FromAddress.length)
                    message.FromAddress = object.FromAddress;
            if (object.ToAddress != null)
                if (typeof object.ToAddress === "string")
                    $util.base64.decode(object.ToAddress, message.ToAddress = $util.newBuffer($util.base64.length(object.ToAddress)), 0);
                else if (object.ToAddress.length)
                    message.ToAddress = object.ToAddress;
            if (object.Amount) {
                if (!Array.isArray(object.Amount))
                    throw TypeError(".cosmos.MsgSend.Amount: array expected");
                message.Amount = [];
                for (var i = 0; i < object.Amount.length; ++i) {
                    if (typeof object.Amount[i] !== "object")
                        throw TypeError(".cosmos.MsgSend.Amount: object expected");
                    message.Amount[i] = $root.cosmos.Coin.fromObject(object.Amount[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.MsgSend
         * @static
         * @param {cosmos.MsgSend} message MsgSend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Amount = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.FromAddress = "";
                else {
                    object.FromAddress = [];
                    if (options.bytes !== Array)
                        object.FromAddress = $util.newBuffer(object.FromAddress);
                }
                if (options.bytes === String)
                    object.ToAddress = "";
                else {
                    object.ToAddress = [];
                    if (options.bytes !== Array)
                        object.ToAddress = $util.newBuffer(object.ToAddress);
                }
            }
            if (message.FromAddress != null && message.hasOwnProperty("FromAddress"))
                object.FromAddress = options.bytes === String ? $util.base64.encode(message.FromAddress, 0, message.FromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.FromAddress) : message.FromAddress;
            if (message.ToAddress != null && message.hasOwnProperty("ToAddress"))
                object.ToAddress = options.bytes === String ? $util.base64.encode(message.ToAddress, 0, message.ToAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.ToAddress) : message.ToAddress;
            if (message.Amount && message.Amount.length) {
                object.Amount = [];
                for (var j = 0; j < message.Amount.length; ++j)
                    object.Amount[j] = $root.cosmos.Coin.toObject(message.Amount[j], options);
            }
            return object;
        };

        /**
         * Converts this MsgSend to JSON.
         * @function toJSON
         * @memberof cosmos.MsgSend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MsgSend;
    })();

    cosmos.MsgDelegate = (function() {

        /**
         * Properties of a MsgDelegate.
         * @memberof cosmos
         * @interface IMsgDelegate
         * @property {Uint8Array} delegatorAddr MsgDelegate delegatorAddr
         * @property {Uint8Array} validatorAddr MsgDelegate validatorAddr
         * @property {cosmos.ICoin} Value MsgDelegate Value
         */

        /**
         * Constructs a new MsgDelegate.
         * @memberof cosmos
         * @classdesc Represents a MsgDelegate.
         * @implements IMsgDelegate
         * @constructor
         * @param {cosmos.IMsgDelegate=} [properties] Properties to set
         */
        function MsgDelegate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgDelegate delegatorAddr.
         * @member {Uint8Array} delegatorAddr
         * @memberof cosmos.MsgDelegate
         * @instance
         */
        MsgDelegate.prototype.delegatorAddr = $util.newBuffer([]);

        /**
         * MsgDelegate validatorAddr.
         * @member {Uint8Array} validatorAddr
         * @memberof cosmos.MsgDelegate
         * @instance
         */
        MsgDelegate.prototype.validatorAddr = $util.newBuffer([]);

        /**
         * MsgDelegate Value.
         * @member {cosmos.ICoin} Value
         * @memberof cosmos.MsgDelegate
         * @instance
         */
        MsgDelegate.prototype.Value = null;

        /**
         * Creates a new MsgDelegate instance using the specified properties.
         * @function create
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {cosmos.IMsgDelegate=} [properties] Properties to set
         * @returns {cosmos.MsgDelegate} MsgDelegate instance
         */
        MsgDelegate.create = function create(properties) {
            return new MsgDelegate(properties);
        };

        /**
         * Encodes the specified MsgDelegate message. Does not implicitly {@link cosmos.MsgDelegate.verify|verify} messages.
         * @function encode
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {cosmos.IMsgDelegate} message MsgDelegate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDelegate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorAddr);
            $root.cosmos.Coin.encode(message.Value, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MsgDelegate message, length delimited. Does not implicitly {@link cosmos.MsgDelegate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {cosmos.IMsgDelegate} message MsgDelegate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgDelegate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgDelegate message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.MsgDelegate} MsgDelegate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDelegate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.MsgDelegate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.bytes();
                    break;
                case 2:
                    message.validatorAddr = reader.bytes();
                    break;
                case 3:
                    message.Value = $root.cosmos.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("delegatorAddr"))
                throw $util.ProtocolError("missing required 'delegatorAddr'", { instance: message });
            if (!message.hasOwnProperty("validatorAddr"))
                throw $util.ProtocolError("missing required 'validatorAddr'", { instance: message });
            if (!message.hasOwnProperty("Value"))
                throw $util.ProtocolError("missing required 'Value'", { instance: message });
            return message;
        };

        /**
         * Decodes a MsgDelegate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.MsgDelegate} MsgDelegate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgDelegate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgDelegate message.
         * @function verify
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgDelegate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!(message.delegatorAddr && typeof message.delegatorAddr.length === "number" || $util.isString(message.delegatorAddr)))
                return "delegatorAddr: buffer expected";
            if (!(message.validatorAddr && typeof message.validatorAddr.length === "number" || $util.isString(message.validatorAddr)))
                return "validatorAddr: buffer expected";
            {
                var error = $root.cosmos.Coin.verify(message.Value);
                if (error)
                    return "Value." + error;
            }
            return null;
        };

        /**
         * Creates a MsgDelegate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.MsgDelegate} MsgDelegate
         */
        MsgDelegate.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.MsgDelegate)
                return object;
            var message = new $root.cosmos.MsgDelegate();
            if (object.delegatorAddr != null)
                if (typeof object.delegatorAddr === "string")
                    $util.base64.decode(object.delegatorAddr, message.delegatorAddr = $util.newBuffer($util.base64.length(object.delegatorAddr)), 0);
                else if (object.delegatorAddr.length)
                    message.delegatorAddr = object.delegatorAddr;
            if (object.validatorAddr != null)
                if (typeof object.validatorAddr === "string")
                    $util.base64.decode(object.validatorAddr, message.validatorAddr = $util.newBuffer($util.base64.length(object.validatorAddr)), 0);
                else if (object.validatorAddr.length)
                    message.validatorAddr = object.validatorAddr;
            if (object.Value != null) {
                if (typeof object.Value !== "object")
                    throw TypeError(".cosmos.MsgDelegate.Value: object expected");
                message.Value = $root.cosmos.Coin.fromObject(object.Value);
            }
            return message;
        };

        /**
         * Creates a plain object from a MsgDelegate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.MsgDelegate
         * @static
         * @param {cosmos.MsgDelegate} message MsgDelegate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgDelegate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.delegatorAddr = "";
                else {
                    object.delegatorAddr = [];
                    if (options.bytes !== Array)
                        object.delegatorAddr = $util.newBuffer(object.delegatorAddr);
                }
                if (options.bytes === String)
                    object.validatorAddr = "";
                else {
                    object.validatorAddr = [];
                    if (options.bytes !== Array)
                        object.validatorAddr = $util.newBuffer(object.validatorAddr);
                }
                object.Value = null;
            }
            if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
            if (message.validatorAddr != null && message.hasOwnProperty("validatorAddr"))
                object.validatorAddr = options.bytes === String ? $util.base64.encode(message.validatorAddr, 0, message.validatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorAddr) : message.validatorAddr;
            if (message.Value != null && message.hasOwnProperty("Value"))
                object.Value = $root.cosmos.Coin.toObject(message.Value, options);
            return object;
        };

        /**
         * Converts this MsgDelegate to JSON.
         * @function toJSON
         * @memberof cosmos.MsgDelegate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgDelegate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MsgDelegate;
    })();

    cosmos.MsgUndelegate = (function() {

        /**
         * Properties of a MsgUndelegate.
         * @memberof cosmos
         * @interface IMsgUndelegate
         * @property {Uint8Array} delegatorAddr MsgUndelegate delegatorAddr
         * @property {Uint8Array} validatorAddr MsgUndelegate validatorAddr
         * @property {string} sharesAmount MsgUndelegate sharesAmount
         */

        /**
         * Constructs a new MsgUndelegate.
         * @memberof cosmos
         * @classdesc Represents a MsgUndelegate.
         * @implements IMsgUndelegate
         * @constructor
         * @param {cosmos.IMsgUndelegate=} [properties] Properties to set
         */
        function MsgUndelegate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgUndelegate delegatorAddr.
         * @member {Uint8Array} delegatorAddr
         * @memberof cosmos.MsgUndelegate
         * @instance
         */
        MsgUndelegate.prototype.delegatorAddr = $util.newBuffer([]);

        /**
         * MsgUndelegate validatorAddr.
         * @member {Uint8Array} validatorAddr
         * @memberof cosmos.MsgUndelegate
         * @instance
         */
        MsgUndelegate.prototype.validatorAddr = $util.newBuffer([]);

        /**
         * MsgUndelegate sharesAmount.
         * @member {string} sharesAmount
         * @memberof cosmos.MsgUndelegate
         * @instance
         */
        MsgUndelegate.prototype.sharesAmount = "";

        /**
         * Creates a new MsgUndelegate instance using the specified properties.
         * @function create
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {cosmos.IMsgUndelegate=} [properties] Properties to set
         * @returns {cosmos.MsgUndelegate} MsgUndelegate instance
         */
        MsgUndelegate.create = function create(properties) {
            return new MsgUndelegate(properties);
        };

        /**
         * Encodes the specified MsgUndelegate message. Does not implicitly {@link cosmos.MsgUndelegate.verify|verify} messages.
         * @function encode
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {cosmos.IMsgUndelegate} message MsgUndelegate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgUndelegate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorAddr);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.sharesAmount);
            return writer;
        };

        /**
         * Encodes the specified MsgUndelegate message, length delimited. Does not implicitly {@link cosmos.MsgUndelegate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {cosmos.IMsgUndelegate} message MsgUndelegate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgUndelegate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgUndelegate message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.MsgUndelegate} MsgUndelegate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgUndelegate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.MsgUndelegate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.bytes();
                    break;
                case 2:
                    message.validatorAddr = reader.bytes();
                    break;
                case 3:
                    message.sharesAmount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("delegatorAddr"))
                throw $util.ProtocolError("missing required 'delegatorAddr'", { instance: message });
            if (!message.hasOwnProperty("validatorAddr"))
                throw $util.ProtocolError("missing required 'validatorAddr'", { instance: message });
            if (!message.hasOwnProperty("sharesAmount"))
                throw $util.ProtocolError("missing required 'sharesAmount'", { instance: message });
            return message;
        };

        /**
         * Decodes a MsgUndelegate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.MsgUndelegate} MsgUndelegate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgUndelegate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgUndelegate message.
         * @function verify
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgUndelegate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!(message.delegatorAddr && typeof message.delegatorAddr.length === "number" || $util.isString(message.delegatorAddr)))
                return "delegatorAddr: buffer expected";
            if (!(message.validatorAddr && typeof message.validatorAddr.length === "number" || $util.isString(message.validatorAddr)))
                return "validatorAddr: buffer expected";
            if (!$util.isString(message.sharesAmount))
                return "sharesAmount: string expected";
            return null;
        };

        /**
         * Creates a MsgUndelegate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.MsgUndelegate} MsgUndelegate
         */
        MsgUndelegate.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.MsgUndelegate)
                return object;
            var message = new $root.cosmos.MsgUndelegate();
            if (object.delegatorAddr != null)
                if (typeof object.delegatorAddr === "string")
                    $util.base64.decode(object.delegatorAddr, message.delegatorAddr = $util.newBuffer($util.base64.length(object.delegatorAddr)), 0);
                else if (object.delegatorAddr.length)
                    message.delegatorAddr = object.delegatorAddr;
            if (object.validatorAddr != null)
                if (typeof object.validatorAddr === "string")
                    $util.base64.decode(object.validatorAddr, message.validatorAddr = $util.newBuffer($util.base64.length(object.validatorAddr)), 0);
                else if (object.validatorAddr.length)
                    message.validatorAddr = object.validatorAddr;
            if (object.sharesAmount != null)
                message.sharesAmount = String(object.sharesAmount);
            return message;
        };

        /**
         * Creates a plain object from a MsgUndelegate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.MsgUndelegate
         * @static
         * @param {cosmos.MsgUndelegate} message MsgUndelegate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgUndelegate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.delegatorAddr = "";
                else {
                    object.delegatorAddr = [];
                    if (options.bytes !== Array)
                        object.delegatorAddr = $util.newBuffer(object.delegatorAddr);
                }
                if (options.bytes === String)
                    object.validatorAddr = "";
                else {
                    object.validatorAddr = [];
                    if (options.bytes !== Array)
                        object.validatorAddr = $util.newBuffer(object.validatorAddr);
                }
                object.sharesAmount = "";
            }
            if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
            if (message.validatorAddr != null && message.hasOwnProperty("validatorAddr"))
                object.validatorAddr = options.bytes === String ? $util.base64.encode(message.validatorAddr, 0, message.validatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorAddr) : message.validatorAddr;
            if (message.sharesAmount != null && message.hasOwnProperty("sharesAmount"))
                object.sharesAmount = message.sharesAmount;
            return object;
        };

        /**
         * Converts this MsgUndelegate to JSON.
         * @function toJSON
         * @memberof cosmos.MsgUndelegate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgUndelegate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MsgUndelegate;
    })();

    cosmos.StdFee = (function() {

        /**
         * Properties of a StdFee.
         * @memberof cosmos
         * @interface IStdFee
         * @property {Array.<cosmos.ICoin>|null} [amount] StdFee amount
         * @property {number|Long} gas StdFee gas
         */

        /**
         * Constructs a new StdFee.
         * @memberof cosmos
         * @classdesc Represents a StdFee.
         * @implements IStdFee
         * @constructor
         * @param {cosmos.IStdFee=} [properties] Properties to set
         */
        function StdFee(properties) {
            this.amount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StdFee amount.
         * @member {Array.<cosmos.ICoin>} amount
         * @memberof cosmos.StdFee
         * @instance
         */
        StdFee.prototype.amount = $util.emptyArray;

        /**
         * StdFee gas.
         * @member {number|Long} gas
         * @memberof cosmos.StdFee
         * @instance
         */
        StdFee.prototype.gas = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new StdFee instance using the specified properties.
         * @function create
         * @memberof cosmos.StdFee
         * @static
         * @param {cosmos.IStdFee=} [properties] Properties to set
         * @returns {cosmos.StdFee} StdFee instance
         */
        StdFee.create = function create(properties) {
            return new StdFee(properties);
        };

        /**
         * Encodes the specified StdFee message. Does not implicitly {@link cosmos.StdFee.verify|verify} messages.
         * @function encode
         * @memberof cosmos.StdFee
         * @static
         * @param {cosmos.IStdFee} message StdFee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdFee.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.amount != null && message.amount.length)
                for (var i = 0; i < message.amount.length; ++i)
                    $root.cosmos.Coin.encode(message.amount[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.gas);
            return writer;
        };

        /**
         * Encodes the specified StdFee message, length delimited. Does not implicitly {@link cosmos.StdFee.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.StdFee
         * @static
         * @param {cosmos.IStdFee} message StdFee message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdFee.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StdFee message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.StdFee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.StdFee} StdFee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdFee.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.StdFee();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.amount && message.amount.length))
                        message.amount = [];
                    message.amount.push($root.cosmos.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.gas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("gas"))
                throw $util.ProtocolError("missing required 'gas'", { instance: message });
            return message;
        };

        /**
         * Decodes a StdFee message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.StdFee
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.StdFee} StdFee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdFee.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StdFee message.
         * @function verify
         * @memberof cosmos.StdFee
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StdFee.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.amount != null && message.hasOwnProperty("amount")) {
                if (!Array.isArray(message.amount))
                    return "amount: array expected";
                for (var i = 0; i < message.amount.length; ++i) {
                    var error = $root.cosmos.Coin.verify(message.amount[i]);
                    if (error)
                        return "amount." + error;
                }
            }
            if (!$util.isInteger(message.gas) && !(message.gas && $util.isInteger(message.gas.low) && $util.isInteger(message.gas.high)))
                return "gas: integer|Long expected";
            return null;
        };

        /**
         * Creates a StdFee message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.StdFee
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.StdFee} StdFee
         */
        StdFee.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.StdFee)
                return object;
            var message = new $root.cosmos.StdFee();
            if (object.amount) {
                if (!Array.isArray(object.amount))
                    throw TypeError(".cosmos.StdFee.amount: array expected");
                message.amount = [];
                for (var i = 0; i < object.amount.length; ++i) {
                    if (typeof object.amount[i] !== "object")
                        throw TypeError(".cosmos.StdFee.amount: object expected");
                    message.amount[i] = $root.cosmos.Coin.fromObject(object.amount[i]);
                }
            }
            if (object.gas != null)
                if ($util.Long)
                    (message.gas = $util.Long.fromValue(object.gas)).unsigned = false;
                else if (typeof object.gas === "string")
                    message.gas = parseInt(object.gas, 10);
                else if (typeof object.gas === "number")
                    message.gas = object.gas;
                else if (typeof object.gas === "object")
                    message.gas = new $util.LongBits(object.gas.low >>> 0, object.gas.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a StdFee message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.StdFee
         * @static
         * @param {cosmos.StdFee} message StdFee
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StdFee.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.amount = [];
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.gas = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gas = options.longs === String ? "0" : 0;
            if (message.amount && message.amount.length) {
                object.amount = [];
                for (var j = 0; j < message.amount.length; ++j)
                    object.amount[j] = $root.cosmos.Coin.toObject(message.amount[j], options);
            }
            if (message.gas != null && message.hasOwnProperty("gas"))
                if (typeof message.gas === "number")
                    object.gas = options.longs === String ? String(message.gas) : message.gas;
                else
                    object.gas = options.longs === String ? $util.Long.prototype.toString.call(message.gas) : options.longs === Number ? new $util.LongBits(message.gas.low >>> 0, message.gas.high >>> 0).toNumber() : message.gas;
            return object;
        };

        /**
         * Converts this StdFee to JSON.
         * @function toJSON
         * @memberof cosmos.StdFee
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StdFee.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StdFee;
    })();

    cosmos.StdSignature = (function() {

        /**
         * Properties of a StdSignature.
         * @memberof cosmos
         * @interface IStdSignature
         * @property {Uint8Array} pubKey StdSignature pubKey
         * @property {Uint8Array} signature StdSignature signature
         */

        /**
         * Constructs a new StdSignature.
         * @memberof cosmos
         * @classdesc Represents a StdSignature.
         * @implements IStdSignature
         * @constructor
         * @param {cosmos.IStdSignature=} [properties] Properties to set
         */
        function StdSignature(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StdSignature pubKey.
         * @member {Uint8Array} pubKey
         * @memberof cosmos.StdSignature
         * @instance
         */
        StdSignature.prototype.pubKey = $util.newBuffer([]);

        /**
         * StdSignature signature.
         * @member {Uint8Array} signature
         * @memberof cosmos.StdSignature
         * @instance
         */
        StdSignature.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new StdSignature instance using the specified properties.
         * @function create
         * @memberof cosmos.StdSignature
         * @static
         * @param {cosmos.IStdSignature=} [properties] Properties to set
         * @returns {cosmos.StdSignature} StdSignature instance
         */
        StdSignature.create = function create(properties) {
            return new StdSignature(properties);
        };

        /**
         * Encodes the specified StdSignature message. Does not implicitly {@link cosmos.StdSignature.verify|verify} messages.
         * @function encode
         * @memberof cosmos.StdSignature
         * @static
         * @param {cosmos.IStdSignature} message StdSignature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdSignature.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.pubKey);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified StdSignature message, length delimited. Does not implicitly {@link cosmos.StdSignature.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.StdSignature
         * @static
         * @param {cosmos.IStdSignature} message StdSignature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdSignature.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StdSignature message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.StdSignature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.StdSignature} StdSignature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdSignature.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.StdSignature();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pubKey = reader.bytes();
                    break;
                case 2:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("pubKey"))
                throw $util.ProtocolError("missing required 'pubKey'", { instance: message });
            if (!message.hasOwnProperty("signature"))
                throw $util.ProtocolError("missing required 'signature'", { instance: message });
            return message;
        };

        /**
         * Decodes a StdSignature message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.StdSignature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.StdSignature} StdSignature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdSignature.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StdSignature message.
         * @function verify
         * @memberof cosmos.StdSignature
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StdSignature.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!(message.pubKey && typeof message.pubKey.length === "number" || $util.isString(message.pubKey)))
                return "pubKey: buffer expected";
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a StdSignature message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.StdSignature
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.StdSignature} StdSignature
         */
        StdSignature.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.StdSignature)
                return object;
            var message = new $root.cosmos.StdSignature();
            if (object.pubKey != null)
                if (typeof object.pubKey === "string")
                    $util.base64.decode(object.pubKey, message.pubKey = $util.newBuffer($util.base64.length(object.pubKey)), 0);
                else if (object.pubKey.length)
                    message.pubKey = object.pubKey;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a StdSignature message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.StdSignature
         * @static
         * @param {cosmos.StdSignature} message StdSignature
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StdSignature.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.pubKey = "";
                else {
                    object.pubKey = [];
                    if (options.bytes !== Array)
                        object.pubKey = $util.newBuffer(object.pubKey);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.pubKey != null && message.hasOwnProperty("pubKey"))
                object.pubKey = options.bytes === String ? $util.base64.encode(message.pubKey, 0, message.pubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.pubKey) : message.pubKey;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this StdSignature to JSON.
         * @function toJSON
         * @memberof cosmos.StdSignature
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StdSignature.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StdSignature;
    })();

    cosmos.StdTx = (function() {

        /**
         * Properties of a StdTx.
         * @memberof cosmos
         * @interface IStdTx
         * @property {Array.<Uint8Array>|null} [msg] StdTx msg
         * @property {cosmos.IStdFee} fee StdTx fee
         * @property {Array.<cosmos.IStdSignature>|null} [signatures] StdTx signatures
         * @property {string|null} [memo] StdTx memo
         */

        /**
         * Constructs a new StdTx.
         * @memberof cosmos
         * @classdesc Represents a StdTx.
         * @implements IStdTx
         * @constructor
         * @param {cosmos.IStdTx=} [properties] Properties to set
         */
        function StdTx(properties) {
            this.msg = [];
            this.signatures = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StdTx msg.
         * @member {Array.<Uint8Array>} msg
         * @memberof cosmos.StdTx
         * @instance
         */
        StdTx.prototype.msg = $util.emptyArray;

        /**
         * StdTx fee.
         * @member {cosmos.IStdFee} fee
         * @memberof cosmos.StdTx
         * @instance
         */
        StdTx.prototype.fee = null;

        /**
         * StdTx signatures.
         * @member {Array.<cosmos.IStdSignature>} signatures
         * @memberof cosmos.StdTx
         * @instance
         */
        StdTx.prototype.signatures = $util.emptyArray;

        /**
         * StdTx memo.
         * @member {string} memo
         * @memberof cosmos.StdTx
         * @instance
         */
        StdTx.prototype.memo = "";

        /**
         * Creates a new StdTx instance using the specified properties.
         * @function create
         * @memberof cosmos.StdTx
         * @static
         * @param {cosmos.IStdTx=} [properties] Properties to set
         * @returns {cosmos.StdTx} StdTx instance
         */
        StdTx.create = function create(properties) {
            return new StdTx(properties);
        };

        /**
         * Encodes the specified StdTx message. Does not implicitly {@link cosmos.StdTx.verify|verify} messages.
         * @function encode
         * @memberof cosmos.StdTx
         * @static
         * @param {cosmos.IStdTx} message StdTx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdTx.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && message.msg.length)
                for (var i = 0; i < message.msg.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.msg[i]);
            $root.cosmos.StdFee.encode(message.fee, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.signatures != null && message.signatures.length)
                for (var i = 0; i < message.signatures.length; ++i)
                    $root.cosmos.StdSignature.encode(message.signatures[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.memo != null && message.hasOwnProperty("memo"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.memo);
            return writer;
        };

        /**
         * Encodes the specified StdTx message, length delimited. Does not implicitly {@link cosmos.StdTx.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.StdTx
         * @static
         * @param {cosmos.IStdTx} message StdTx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdTx.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StdTx message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.StdTx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.StdTx} StdTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdTx.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.cosmos.StdTx();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.msg && message.msg.length))
                        message.msg = [];
                    message.msg.push(reader.bytes());
                    break;
                case 2:
                    message.fee = $root.cosmos.StdFee.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.signatures && message.signatures.length))
                        message.signatures = [];
                    message.signatures.push($root.cosmos.StdSignature.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.memo = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("fee"))
                throw $util.ProtocolError("missing required 'fee'", { instance: message });
            return message;
        };

        /**
         * Decodes a StdTx message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.StdTx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.StdTx} StdTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdTx.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StdTx message.
         * @function verify
         * @memberof cosmos.StdTx
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StdTx.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg")) {
                if (!Array.isArray(message.msg))
                    return "msg: array expected";
                for (var i = 0; i < message.msg.length; ++i)
                    if (!(message.msg[i] && typeof message.msg[i].length === "number" || $util.isString(message.msg[i])))
                        return "msg: buffer[] expected";
            }
            {
                var error = $root.cosmos.StdFee.verify(message.fee);
                if (error)
                    return "fee." + error;
            }
            if (message.signatures != null && message.hasOwnProperty("signatures")) {
                if (!Array.isArray(message.signatures))
                    return "signatures: array expected";
                for (var i = 0; i < message.signatures.length; ++i) {
                    var error = $root.cosmos.StdSignature.verify(message.signatures[i]);
                    if (error)
                        return "signatures." + error;
                }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            return null;
        };

        /**
         * Creates a StdTx message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.StdTx
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.StdTx} StdTx
         */
        StdTx.fromObject = function fromObject(object) {
            if (object instanceof $root.cosmos.StdTx)
                return object;
            var message = new $root.cosmos.StdTx();
            if (object.msg) {
                if (!Array.isArray(object.msg))
                    throw TypeError(".cosmos.StdTx.msg: array expected");
                message.msg = [];
                for (var i = 0; i < object.msg.length; ++i)
                    if (typeof object.msg[i] === "string")
                        $util.base64.decode(object.msg[i], message.msg[i] = $util.newBuffer($util.base64.length(object.msg[i])), 0);
                    else if (object.msg[i].length)
                        message.msg[i] = object.msg[i];
            }
            if (object.fee != null) {
                if (typeof object.fee !== "object")
                    throw TypeError(".cosmos.StdTx.fee: object expected");
                message.fee = $root.cosmos.StdFee.fromObject(object.fee);
            }
            if (object.signatures) {
                if (!Array.isArray(object.signatures))
                    throw TypeError(".cosmos.StdTx.signatures: array expected");
                message.signatures = [];
                for (var i = 0; i < object.signatures.length; ++i) {
                    if (typeof object.signatures[i] !== "object")
                        throw TypeError(".cosmos.StdTx.signatures: object expected");
                    message.signatures[i] = $root.cosmos.StdSignature.fromObject(object.signatures[i]);
                }
            }
            if (object.memo != null)
                message.memo = String(object.memo);
            return message;
        };

        /**
         * Creates a plain object from a StdTx message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.StdTx
         * @static
         * @param {cosmos.StdTx} message StdTx
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StdTx.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.msg = [];
                object.signatures = [];
            }
            if (options.defaults) {
                object.fee = null;
                object.memo = "";
            }
            if (message.msg && message.msg.length) {
                object.msg = [];
                for (var j = 0; j < message.msg.length; ++j)
                    object.msg[j] = options.bytes === String ? $util.base64.encode(message.msg[j], 0, message.msg[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.msg[j]) : message.msg[j];
            }
            if (message.fee != null && message.hasOwnProperty("fee"))
                object.fee = $root.cosmos.StdFee.toObject(message.fee, options);
            if (message.signatures && message.signatures.length) {
                object.signatures = [];
                for (var j = 0; j < message.signatures.length; ++j)
                    object.signatures[j] = $root.cosmos.StdSignature.toObject(message.signatures[j], options);
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            return object;
        };

        /**
         * Converts this StdTx to JSON.
         * @function toJSON
         * @memberof cosmos.StdTx
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StdTx.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StdTx;
    })();

    return cosmos;
})();

module.exports = $root;
