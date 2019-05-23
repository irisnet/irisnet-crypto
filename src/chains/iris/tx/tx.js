/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.irisnet = (function() {

    /**
     * Namespace irisnet.
     * @exports irisnet
     * @namespace
     */
    var irisnet = {};

    irisnet.tx = (function() {

        /**
         * Namespace tx.
         * @memberof irisnet
         * @namespace
         */
        var tx = {};

        tx.Coin = (function() {

            /**
             * Properties of a Coin.
             * @memberof irisnet.tx
             * @interface ICoin
             * @property {string} denom Coin denom
             * @property {string} amount Coin amount
             */

            /**
             * Constructs a new Coin.
             * @memberof irisnet.tx
             * @classdesc Represents a Coin.
             * @implements ICoin
             * @constructor
             * @param {irisnet.tx.ICoin=} [properties] Properties to set
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
             * @memberof irisnet.tx.Coin
             * @instance
             */
            Coin.prototype.denom = "";

            /**
             * Coin amount.
             * @member {string} amount
             * @memberof irisnet.tx.Coin
             * @instance
             */
            Coin.prototype.amount = "";

            /**
             * Creates a new Coin instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.Coin
             * @static
             * @param {irisnet.tx.ICoin=} [properties] Properties to set
             * @returns {irisnet.tx.Coin} Coin instance
             */
            Coin.create = function create(properties) {
                return new Coin(properties);
            };

            /**
             * Encodes the specified Coin message. Does not implicitly {@link irisnet.tx.Coin.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.Coin
             * @static
             * @param {irisnet.tx.ICoin} message Coin message or plain object to encode
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
             * Encodes the specified Coin message, length delimited. Does not implicitly {@link irisnet.tx.Coin.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.Coin
             * @static
             * @param {irisnet.tx.ICoin} message Coin message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Coin.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Coin message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.Coin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.Coin} Coin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Coin.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.Coin();
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
             * @memberof irisnet.tx.Coin
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.Coin} Coin
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
             * @memberof irisnet.tx.Coin
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
             * @memberof irisnet.tx.Coin
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.Coin} Coin
             */
            Coin.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.Coin)
                    return object;
                var message = new $root.irisnet.tx.Coin();
                if (object.denom != null)
                    message.denom = String(object.denom);
                if (object.amount != null)
                    message.amount = String(object.amount);
                return message;
            };

            /**
             * Creates a plain object from a Coin message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.Coin
             * @static
             * @param {irisnet.tx.Coin} message Coin
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
             * @memberof irisnet.tx.Coin
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Coin.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Coin;
        })();

        tx.Input = (function() {

            /**
             * Properties of an Input.
             * @memberof irisnet.tx
             * @interface IInput
             * @property {Uint8Array} address Input address
             * @property {Array.<irisnet.tx.ICoin>|null} [coins] Input coins
             */

            /**
             * Constructs a new Input.
             * @memberof irisnet.tx
             * @classdesc Represents an Input.
             * @implements IInput
             * @constructor
             * @param {irisnet.tx.IInput=} [properties] Properties to set
             */
            function Input(properties) {
                this.coins = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Input address.
             * @member {Uint8Array} address
             * @memberof irisnet.tx.Input
             * @instance
             */
            Input.prototype.address = $util.newBuffer([]);

            /**
             * Input coins.
             * @member {Array.<irisnet.tx.ICoin>} coins
             * @memberof irisnet.tx.Input
             * @instance
             */
            Input.prototype.coins = $util.emptyArray;

            /**
             * Creates a new Input instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.Input
             * @static
             * @param {irisnet.tx.IInput=} [properties] Properties to set
             * @returns {irisnet.tx.Input} Input instance
             */
            Input.create = function create(properties) {
                return new Input(properties);
            };

            /**
             * Encodes the specified Input message. Does not implicitly {@link irisnet.tx.Input.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.Input
             * @static
             * @param {irisnet.tx.IInput} message Input message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Input.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                if (message.coins != null && message.coins.length)
                    for (var i = 0; i < message.coins.length; ++i)
                        $root.irisnet.tx.Coin.encode(message.coins[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Input message, length delimited. Does not implicitly {@link irisnet.tx.Input.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.Input
             * @static
             * @param {irisnet.tx.IInput} message Input message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Input.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Input message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.Input
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.Input} Input
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Input.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.Input();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.address = reader.bytes();
                        break;
                    case 2:
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.irisnet.tx.Coin.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("address"))
                    throw $util.ProtocolError("missing required 'address'", { instance: message });
                return message;
            };

            /**
             * Decodes an Input message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.Input
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.Input} Input
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Input.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Input message.
             * @function verify
             * @memberof irisnet.tx.Input
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Input.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
                if (message.coins != null && message.hasOwnProperty("coins")) {
                    if (!Array.isArray(message.coins))
                        return "coins: array expected";
                    for (var i = 0; i < message.coins.length; ++i) {
                        var error = $root.irisnet.tx.Coin.verify(message.coins[i]);
                        if (error)
                            return "coins." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an Input message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.Input
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.Input} Input
             */
            Input.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.Input)
                    return object;
                var message = new $root.irisnet.tx.Input();
                if (object.address != null)
                    if (typeof object.address === "string")
                        $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                    else if (object.address.length)
                        message.address = object.address;
                if (object.coins) {
                    if (!Array.isArray(object.coins))
                        throw TypeError(".irisnet.tx.Input.coins: array expected");
                    message.coins = [];
                    for (var i = 0; i < object.coins.length; ++i) {
                        if (typeof object.coins[i] !== "object")
                            throw TypeError(".irisnet.tx.Input.coins: object expected");
                        message.coins[i] = $root.irisnet.tx.Coin.fromObject(object.coins[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an Input message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.Input
             * @static
             * @param {irisnet.tx.Input} message Input
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Input.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.coins = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.address = "";
                    else {
                        object.address = [];
                        if (options.bytes !== Array)
                            object.address = $util.newBuffer(object.address);
                    }
                if (message.address != null && message.hasOwnProperty("address"))
                    object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                if (message.coins && message.coins.length) {
                    object.coins = [];
                    for (var j = 0; j < message.coins.length; ++j)
                        object.coins[j] = $root.irisnet.tx.Coin.toObject(message.coins[j], options);
                }
                return object;
            };

            /**
             * Converts this Input to JSON.
             * @function toJSON
             * @memberof irisnet.tx.Input
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Input.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Input;
        })();

        tx.Output = (function() {

            /**
             * Properties of an Output.
             * @memberof irisnet.tx
             * @interface IOutput
             * @property {Uint8Array} address Output address
             * @property {Array.<irisnet.tx.ICoin>|null} [coins] Output coins
             */

            /**
             * Constructs a new Output.
             * @memberof irisnet.tx
             * @classdesc Represents an Output.
             * @implements IOutput
             * @constructor
             * @param {irisnet.tx.IOutput=} [properties] Properties to set
             */
            function Output(properties) {
                this.coins = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Output address.
             * @member {Uint8Array} address
             * @memberof irisnet.tx.Output
             * @instance
             */
            Output.prototype.address = $util.newBuffer([]);

            /**
             * Output coins.
             * @member {Array.<irisnet.tx.ICoin>} coins
             * @memberof irisnet.tx.Output
             * @instance
             */
            Output.prototype.coins = $util.emptyArray;

            /**
             * Creates a new Output instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.Output
             * @static
             * @param {irisnet.tx.IOutput=} [properties] Properties to set
             * @returns {irisnet.tx.Output} Output instance
             */
            Output.create = function create(properties) {
                return new Output(properties);
            };

            /**
             * Encodes the specified Output message. Does not implicitly {@link irisnet.tx.Output.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.Output
             * @static
             * @param {irisnet.tx.IOutput} message Output message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Output.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                if (message.coins != null && message.coins.length)
                    for (var i = 0; i < message.coins.length; ++i)
                        $root.irisnet.tx.Coin.encode(message.coins[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Output message, length delimited. Does not implicitly {@link irisnet.tx.Output.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.Output
             * @static
             * @param {irisnet.tx.IOutput} message Output message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Output.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Output message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.Output
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.Output} Output
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Output.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.Output();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.address = reader.bytes();
                        break;
                    case 2:
                        if (!(message.coins && message.coins.length))
                            message.coins = [];
                        message.coins.push($root.irisnet.tx.Coin.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("address"))
                    throw $util.ProtocolError("missing required 'address'", { instance: message });
                return message;
            };

            /**
             * Decodes an Output message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.Output
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.Output} Output
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Output.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Output message.
             * @function verify
             * @memberof irisnet.tx.Output
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Output.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
                if (message.coins != null && message.hasOwnProperty("coins")) {
                    if (!Array.isArray(message.coins))
                        return "coins: array expected";
                    for (var i = 0; i < message.coins.length; ++i) {
                        var error = $root.irisnet.tx.Coin.verify(message.coins[i]);
                        if (error)
                            return "coins." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an Output message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.Output
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.Output} Output
             */
            Output.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.Output)
                    return object;
                var message = new $root.irisnet.tx.Output();
                if (object.address != null)
                    if (typeof object.address === "string")
                        $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                    else if (object.address.length)
                        message.address = object.address;
                if (object.coins) {
                    if (!Array.isArray(object.coins))
                        throw TypeError(".irisnet.tx.Output.coins: array expected");
                    message.coins = [];
                    for (var i = 0; i < object.coins.length; ++i) {
                        if (typeof object.coins[i] !== "object")
                            throw TypeError(".irisnet.tx.Output.coins: object expected");
                        message.coins[i] = $root.irisnet.tx.Coin.fromObject(object.coins[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an Output message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.Output
             * @static
             * @param {irisnet.tx.Output} message Output
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Output.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.coins = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.address = "";
                    else {
                        object.address = [];
                        if (options.bytes !== Array)
                            object.address = $util.newBuffer(object.address);
                    }
                if (message.address != null && message.hasOwnProperty("address"))
                    object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                if (message.coins && message.coins.length) {
                    object.coins = [];
                    for (var j = 0; j < message.coins.length; ++j)
                        object.coins[j] = $root.irisnet.tx.Coin.toObject(message.coins[j], options);
                }
                return object;
            };

            /**
             * Converts this Output to JSON.
             * @function toJSON
             * @memberof irisnet.tx.Output
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Output.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Output;
        })();

        tx.MsgSend = (function() {

            /**
             * Properties of a MsgSend.
             * @memberof irisnet.tx
             * @interface IMsgSend
             * @property {Array.<irisnet.tx.IInput>|null} [input] MsgSend input
             * @property {Array.<irisnet.tx.IOutput>|null} [output] MsgSend output
             */

            /**
             * Constructs a new MsgSend.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgSend.
             * @implements IMsgSend
             * @constructor
             * @param {irisnet.tx.IMsgSend=} [properties] Properties to set
             */
            function MsgSend(properties) {
                this.input = [];
                this.output = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgSend input.
             * @member {Array.<irisnet.tx.IInput>} input
             * @memberof irisnet.tx.MsgSend
             * @instance
             */
            MsgSend.prototype.input = $util.emptyArray;

            /**
             * MsgSend output.
             * @member {Array.<irisnet.tx.IOutput>} output
             * @memberof irisnet.tx.MsgSend
             * @instance
             */
            MsgSend.prototype.output = $util.emptyArray;

            /**
             * Creates a new MsgSend instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {irisnet.tx.IMsgSend=} [properties] Properties to set
             * @returns {irisnet.tx.MsgSend} MsgSend instance
             */
            MsgSend.create = function create(properties) {
                return new MsgSend(properties);
            };

            /**
             * Encodes the specified MsgSend message. Does not implicitly {@link irisnet.tx.MsgSend.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {irisnet.tx.IMsgSend} message MsgSend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgSend.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.input != null && message.input.length)
                    for (var i = 0; i < message.input.length; ++i)
                        $root.irisnet.tx.Input.encode(message.input[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.output != null && message.output.length)
                    for (var i = 0; i < message.output.length; ++i)
                        $root.irisnet.tx.Output.encode(message.output[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link irisnet.tx.MsgSend.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {irisnet.tx.IMsgSend} message MsgSend message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgSend.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgSend message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgSend} MsgSend
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgSend.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgSend();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.input && message.input.length))
                            message.input = [];
                        message.input.push($root.irisnet.tx.Input.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        if (!(message.output && message.output.length))
                            message.output = [];
                        message.output.push($root.irisnet.tx.Output.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MsgSend message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgSend} MsgSend
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
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgSend.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.input != null && message.hasOwnProperty("input")) {
                    if (!Array.isArray(message.input))
                        return "input: array expected";
                    for (var i = 0; i < message.input.length; ++i) {
                        var error = $root.irisnet.tx.Input.verify(message.input[i]);
                        if (error)
                            return "input." + error;
                    }
                }
                if (message.output != null && message.hasOwnProperty("output")) {
                    if (!Array.isArray(message.output))
                        return "output: array expected";
                    for (var i = 0; i < message.output.length; ++i) {
                        var error = $root.irisnet.tx.Output.verify(message.output[i]);
                        if (error)
                            return "output." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgSend} MsgSend
             */
            MsgSend.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgSend)
                    return object;
                var message = new $root.irisnet.tx.MsgSend();
                if (object.input) {
                    if (!Array.isArray(object.input))
                        throw TypeError(".irisnet.tx.MsgSend.input: array expected");
                    message.input = [];
                    for (var i = 0; i < object.input.length; ++i) {
                        if (typeof object.input[i] !== "object")
                            throw TypeError(".irisnet.tx.MsgSend.input: object expected");
                        message.input[i] = $root.irisnet.tx.Input.fromObject(object.input[i]);
                    }
                }
                if (object.output) {
                    if (!Array.isArray(object.output))
                        throw TypeError(".irisnet.tx.MsgSend.output: array expected");
                    message.output = [];
                    for (var i = 0; i < object.output.length; ++i) {
                        if (typeof object.output[i] !== "object")
                            throw TypeError(".irisnet.tx.MsgSend.output: object expected");
                        message.output[i] = $root.irisnet.tx.Output.fromObject(object.output[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgSend
             * @static
             * @param {irisnet.tx.MsgSend} message MsgSend
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgSend.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.input = [];
                    object.output = [];
                }
                if (message.input && message.input.length) {
                    object.input = [];
                    for (var j = 0; j < message.input.length; ++j)
                        object.input[j] = $root.irisnet.tx.Input.toObject(message.input[j], options);
                }
                if (message.output && message.output.length) {
                    object.output = [];
                    for (var j = 0; j < message.output.length; ++j)
                        object.output[j] = $root.irisnet.tx.Output.toObject(message.output[j], options);
                }
                return object;
            };

            /**
             * Converts this MsgSend to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgSend
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgSend.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgSend;
        })();

        tx.MsgDelegate = (function() {

            /**
             * Properties of a MsgDelegate.
             * @memberof irisnet.tx
             * @interface IMsgDelegate
             * @property {Uint8Array} delegatorAddr MsgDelegate delegatorAddr
             * @property {Uint8Array} validatorAddr MsgDelegate validatorAddr
             * @property {irisnet.tx.ICoin} delegation MsgDelegate delegation
             */

            /**
             * Constructs a new MsgDelegate.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgDelegate.
             * @implements IMsgDelegate
             * @constructor
             * @param {irisnet.tx.IMsgDelegate=} [properties] Properties to set
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
             * @memberof irisnet.tx.MsgDelegate
             * @instance
             */
            MsgDelegate.prototype.delegatorAddr = $util.newBuffer([]);

            /**
             * MsgDelegate validatorAddr.
             * @member {Uint8Array} validatorAddr
             * @memberof irisnet.tx.MsgDelegate
             * @instance
             */
            MsgDelegate.prototype.validatorAddr = $util.newBuffer([]);

            /**
             * MsgDelegate delegation.
             * @member {irisnet.tx.ICoin} delegation
             * @memberof irisnet.tx.MsgDelegate
             * @instance
             */
            MsgDelegate.prototype.delegation = null;

            /**
             * Creates a new MsgDelegate instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {irisnet.tx.IMsgDelegate=} [properties] Properties to set
             * @returns {irisnet.tx.MsgDelegate} MsgDelegate instance
             */
            MsgDelegate.create = function create(properties) {
                return new MsgDelegate(properties);
            };

            /**
             * Encodes the specified MsgDelegate message. Does not implicitly {@link irisnet.tx.MsgDelegate.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {irisnet.tx.IMsgDelegate} message MsgDelegate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgDelegate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorAddr);
                $root.irisnet.tx.Coin.encode(message.delegation, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MsgDelegate message, length delimited. Does not implicitly {@link irisnet.tx.MsgDelegate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {irisnet.tx.IMsgDelegate} message MsgDelegate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgDelegate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgDelegate message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgDelegate} MsgDelegate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgDelegate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgDelegate();
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
                        message.delegation = $root.irisnet.tx.Coin.decode(reader, reader.uint32());
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
                if (!message.hasOwnProperty("delegation"))
                    throw $util.ProtocolError("missing required 'delegation'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgDelegate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgDelegate} MsgDelegate
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
             * @memberof irisnet.tx.MsgDelegate
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
                    var error = $root.irisnet.tx.Coin.verify(message.delegation);
                    if (error)
                        return "delegation." + error;
                }
                return null;
            };

            /**
             * Creates a MsgDelegate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgDelegate} MsgDelegate
             */
            MsgDelegate.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgDelegate)
                    return object;
                var message = new $root.irisnet.tx.MsgDelegate();
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
                if (object.delegation != null) {
                    if (typeof object.delegation !== "object")
                        throw TypeError(".irisnet.tx.MsgDelegate.delegation: object expected");
                    message.delegation = $root.irisnet.tx.Coin.fromObject(object.delegation);
                }
                return message;
            };

            /**
             * Creates a plain object from a MsgDelegate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgDelegate
             * @static
             * @param {irisnet.tx.MsgDelegate} message MsgDelegate
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
                    object.delegation = null;
                }
                if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                    object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
                if (message.validatorAddr != null && message.hasOwnProperty("validatorAddr"))
                    object.validatorAddr = options.bytes === String ? $util.base64.encode(message.validatorAddr, 0, message.validatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorAddr) : message.validatorAddr;
                if (message.delegation != null && message.hasOwnProperty("delegation"))
                    object.delegation = $root.irisnet.tx.Coin.toObject(message.delegation, options);
                return object;
            };

            /**
             * Converts this MsgDelegate to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgDelegate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgDelegate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgDelegate;
        })();

        tx.MsgBeginUnbonding = (function() {

            /**
             * Properties of a MsgBeginUnbonding.
             * @memberof irisnet.tx
             * @interface IMsgBeginUnbonding
             * @property {Uint8Array} delegatorAddr MsgBeginUnbonding delegatorAddr
             * @property {Uint8Array} validatorAddr MsgBeginUnbonding validatorAddr
             * @property {string} sharesAmount MsgBeginUnbonding sharesAmount
             */

            /**
             * Constructs a new MsgBeginUnbonding.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgBeginUnbonding.
             * @implements IMsgBeginUnbonding
             * @constructor
             * @param {irisnet.tx.IMsgBeginUnbonding=} [properties] Properties to set
             */
            function MsgBeginUnbonding(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgBeginUnbonding delegatorAddr.
             * @member {Uint8Array} delegatorAddr
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @instance
             */
            MsgBeginUnbonding.prototype.delegatorAddr = $util.newBuffer([]);

            /**
             * MsgBeginUnbonding validatorAddr.
             * @member {Uint8Array} validatorAddr
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @instance
             */
            MsgBeginUnbonding.prototype.validatorAddr = $util.newBuffer([]);

            /**
             * MsgBeginUnbonding sharesAmount.
             * @member {string} sharesAmount
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @instance
             */
            MsgBeginUnbonding.prototype.sharesAmount = "";

            /**
             * Creates a new MsgBeginUnbonding instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {irisnet.tx.IMsgBeginUnbonding=} [properties] Properties to set
             * @returns {irisnet.tx.MsgBeginUnbonding} MsgBeginUnbonding instance
             */
            MsgBeginUnbonding.create = function create(properties) {
                return new MsgBeginUnbonding(properties);
            };

            /**
             * Encodes the specified MsgBeginUnbonding message. Does not implicitly {@link irisnet.tx.MsgBeginUnbonding.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {irisnet.tx.IMsgBeginUnbonding} message MsgBeginUnbonding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgBeginUnbonding.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorAddr);
                let shares = message.sharesAmount.replace(".",""); //fuck
                writer.uint32(/* id 3, wireType 2 =*/26).string(shares);
                return writer;
            };

            /**
             * Encodes the specified MsgBeginUnbonding message, length delimited. Does not implicitly {@link irisnet.tx.MsgBeginUnbonding.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {irisnet.tx.IMsgBeginUnbonding} message MsgBeginUnbonding message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgBeginUnbonding.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgBeginUnbonding message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgBeginUnbonding} MsgBeginUnbonding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgBeginUnbonding.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgBeginUnbonding();
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
             * Decodes a MsgBeginUnbonding message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgBeginUnbonding} MsgBeginUnbonding
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgBeginUnbonding.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgBeginUnbonding message.
             * @function verify
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgBeginUnbonding.verify = function verify(message) {
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
             * Creates a MsgBeginUnbonding message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgBeginUnbonding} MsgBeginUnbonding
             */
            MsgBeginUnbonding.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgBeginUnbonding)
                    return object;
                var message = new $root.irisnet.tx.MsgBeginUnbonding();
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
             * Creates a plain object from a MsgBeginUnbonding message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @static
             * @param {irisnet.tx.MsgBeginUnbonding} message MsgBeginUnbonding
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgBeginUnbonding.toObject = function toObject(message, options) {
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
             * Converts this MsgBeginUnbonding to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgBeginUnbonding
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgBeginUnbonding.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgBeginUnbonding;
        })();

        tx.MsgBeginRedelegate = (function() {

            /**
             * Properties of a MsgBeginRedelegate.
             * @memberof irisnet.tx
             * @interface IMsgBeginRedelegate
             * @property {Uint8Array} delegatorAddr MsgBeginRedelegate delegatorAddr
             * @property {Uint8Array} validatorSrcAddr MsgBeginRedelegate validatorSrcAddr
             * @property {Uint8Array} validatorDstAddr MsgBeginRedelegate validatorDstAddr
             * @property {string} sharesAmount MsgBeginRedelegate sharesAmount
             */

            /**
             * Constructs a new MsgBeginRedelegate.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgBeginRedelegate.
             * @implements IMsgBeginRedelegate
             * @constructor
             * @param {irisnet.tx.IMsgBeginRedelegate=} [properties] Properties to set
             */
            function MsgBeginRedelegate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgBeginRedelegate delegatorAddr.
             * @member {Uint8Array} delegatorAddr
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @instance
             */
            MsgBeginRedelegate.prototype.delegatorAddr = $util.newBuffer([]);

            /**
             * MsgBeginRedelegate validatorSrcAddr.
             * @member {Uint8Array} validatorSrcAddr
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @instance
             */
            MsgBeginRedelegate.prototype.validatorSrcAddr = $util.newBuffer([]);

            /**
             * MsgBeginRedelegate validatorDstAddr.
             * @member {Uint8Array} validatorDstAddr
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @instance
             */
            MsgBeginRedelegate.prototype.validatorDstAddr = $util.newBuffer([]);

            /**
             * MsgBeginRedelegate sharesAmount.
             * @member {string} sharesAmount
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @instance
             */
            MsgBeginRedelegate.prototype.sharesAmount = "";

            /**
             * Creates a new MsgBeginRedelegate instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {irisnet.tx.IMsgBeginRedelegate=} [properties] Properties to set
             * @returns {irisnet.tx.MsgBeginRedelegate} MsgBeginRedelegate instance
             */
            MsgBeginRedelegate.create = function create(properties) {
                return new MsgBeginRedelegate(properties);
            };

            /**
             * Encodes the specified MsgBeginRedelegate message. Does not implicitly {@link irisnet.tx.MsgBeginRedelegate.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {irisnet.tx.IMsgBeginRedelegate} message MsgBeginRedelegate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgBeginRedelegate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorSrcAddr);
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.validatorDstAddr);
                let shares = message.sharesAmount.replace(".",""); //fuck
                writer.uint32(/* id 4, wireType 2 =*/34).string(shares);
                return writer;
            };

            /**
             * Encodes the specified MsgBeginRedelegate message, length delimited. Does not implicitly {@link irisnet.tx.MsgBeginRedelegate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {irisnet.tx.IMsgBeginRedelegate} message MsgBeginRedelegate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgBeginRedelegate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgBeginRedelegate message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgBeginRedelegate} MsgBeginRedelegate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgBeginRedelegate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgBeginRedelegate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.delegatorAddr = reader.bytes();
                        break;
                    case 2:
                        message.validatorSrcAddr = reader.bytes();
                        break;
                    case 3:
                        message.validatorDstAddr = reader.bytes();
                        break;
                    case 4:
                        message.sharesAmount = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("delegatorAddr"))
                    throw $util.ProtocolError("missing required 'delegatorAddr'", { instance: message });
                if (!message.hasOwnProperty("validatorSrcAddr"))
                    throw $util.ProtocolError("missing required 'validatorSrcAddr'", { instance: message });
                if (!message.hasOwnProperty("validatorDstAddr"))
                    throw $util.ProtocolError("missing required 'validatorDstAddr'", { instance: message });
                if (!message.hasOwnProperty("sharesAmount"))
                    throw $util.ProtocolError("missing required 'sharesAmount'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgBeginRedelegate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgBeginRedelegate} MsgBeginRedelegate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgBeginRedelegate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgBeginRedelegate message.
             * @function verify
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgBeginRedelegate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.delegatorAddr && typeof message.delegatorAddr.length === "number" || $util.isString(message.delegatorAddr)))
                    return "delegatorAddr: buffer expected";
                if (!(message.validatorSrcAddr && typeof message.validatorSrcAddr.length === "number" || $util.isString(message.validatorSrcAddr)))
                    return "validatorSrcAddr: buffer expected";
                if (!(message.validatorDstAddr && typeof message.validatorDstAddr.length === "number" || $util.isString(message.validatorDstAddr)))
                    return "validatorDstAddr: buffer expected";
                if (!$util.isString(message.sharesAmount))
                    return "sharesAmount: string expected";
                return null;
            };

            /**
             * Creates a MsgBeginRedelegate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgBeginRedelegate} MsgBeginRedelegate
             */
            MsgBeginRedelegate.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgBeginRedelegate)
                    return object;
                var message = new $root.irisnet.tx.MsgBeginRedelegate();
                if (object.delegatorAddr != null)
                    if (typeof object.delegatorAddr === "string")
                        $util.base64.decode(object.delegatorAddr, message.delegatorAddr = $util.newBuffer($util.base64.length(object.delegatorAddr)), 0);
                    else if (object.delegatorAddr.length)
                        message.delegatorAddr = object.delegatorAddr;
                if (object.validatorSrcAddr != null)
                    if (typeof object.validatorSrcAddr === "string")
                        $util.base64.decode(object.validatorSrcAddr, message.validatorSrcAddr = $util.newBuffer($util.base64.length(object.validatorSrcAddr)), 0);
                    else if (object.validatorSrcAddr.length)
                        message.validatorSrcAddr = object.validatorSrcAddr;
                if (object.validatorDstAddr != null)
                    if (typeof object.validatorDstAddr === "string")
                        $util.base64.decode(object.validatorDstAddr, message.validatorDstAddr = $util.newBuffer($util.base64.length(object.validatorDstAddr)), 0);
                    else if (object.validatorDstAddr.length)
                        message.validatorDstAddr = object.validatorDstAddr;
                if (object.sharesAmount != null)
                    message.sharesAmount = String(object.sharesAmount);
                return message;
            };

            /**
             * Creates a plain object from a MsgBeginRedelegate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @static
             * @param {irisnet.tx.MsgBeginRedelegate} message MsgBeginRedelegate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgBeginRedelegate.toObject = function toObject(message, options) {
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
                        object.validatorSrcAddr = "";
                    else {
                        object.validatorSrcAddr = [];
                        if (options.bytes !== Array)
                            object.validatorSrcAddr = $util.newBuffer(object.validatorSrcAddr);
                    }
                    if (options.bytes === String)
                        object.validatorDstAddr = "";
                    else {
                        object.validatorDstAddr = [];
                        if (options.bytes !== Array)
                            object.validatorDstAddr = $util.newBuffer(object.validatorDstAddr);
                    }
                    object.sharesAmount = "";
                }
                if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                    object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
                if (message.validatorSrcAddr != null && message.hasOwnProperty("validatorSrcAddr"))
                    object.validatorSrcAddr = options.bytes === String ? $util.base64.encode(message.validatorSrcAddr, 0, message.validatorSrcAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorSrcAddr) : message.validatorSrcAddr;
                if (message.validatorDstAddr != null && message.hasOwnProperty("validatorDstAddr"))
                    object.validatorDstAddr = options.bytes === String ? $util.base64.encode(message.validatorDstAddr, 0, message.validatorDstAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorDstAddr) : message.validatorDstAddr;
                if (message.sharesAmount != null && message.hasOwnProperty("sharesAmount"))
                    object.sharesAmount = message.sharesAmount;
                return object;
            };

            /**
             * Converts this MsgBeginRedelegate to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgBeginRedelegate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgBeginRedelegate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgBeginRedelegate;
        })();

        tx.MsgWithdrawDelegatorRewardsAll = (function() {

            /**
             * Properties of a MsgWithdrawDelegatorRewardsAll.
             * @memberof irisnet.tx
             * @interface IMsgWithdrawDelegatorRewardsAll
             * @property {Uint8Array} delegatorAddr MsgWithdrawDelegatorRewardsAll delegatorAddr
             */

            /**
             * Constructs a new MsgWithdrawDelegatorRewardsAll.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgWithdrawDelegatorRewardsAll.
             * @implements IMsgWithdrawDelegatorRewardsAll
             * @constructor
             * @param {irisnet.tx.IMsgWithdrawDelegatorRewardsAll=} [properties] Properties to set
             */
            function MsgWithdrawDelegatorRewardsAll(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgWithdrawDelegatorRewardsAll delegatorAddr.
             * @member {Uint8Array} delegatorAddr
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @instance
             */
            MsgWithdrawDelegatorRewardsAll.prototype.delegatorAddr = $util.newBuffer([]);

            /**
             * Creates a new MsgWithdrawDelegatorRewardsAll instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorRewardsAll=} [properties] Properties to set
             * @returns {irisnet.tx.MsgWithdrawDelegatorRewardsAll} MsgWithdrawDelegatorRewardsAll instance
             */
            MsgWithdrawDelegatorRewardsAll.create = function create(properties) {
                return new MsgWithdrawDelegatorRewardsAll(properties);
            };

            /**
             * Encodes the specified MsgWithdrawDelegatorRewardsAll message. Does not implicitly {@link irisnet.tx.MsgWithdrawDelegatorRewardsAll.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorRewardsAll} message MsgWithdrawDelegatorRewardsAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgWithdrawDelegatorRewardsAll.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
                return writer;
            };

            /**
             * Encodes the specified MsgWithdrawDelegatorRewardsAll message, length delimited. Does not implicitly {@link irisnet.tx.MsgWithdrawDelegatorRewardsAll.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorRewardsAll} message MsgWithdrawDelegatorRewardsAll message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgWithdrawDelegatorRewardsAll.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgWithdrawDelegatorRewardsAll message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgWithdrawDelegatorRewardsAll} MsgWithdrawDelegatorRewardsAll
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgWithdrawDelegatorRewardsAll.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgWithdrawDelegatorRewardsAll();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.delegatorAddr = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("delegatorAddr"))
                    throw $util.ProtocolError("missing required 'delegatorAddr'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgWithdrawDelegatorRewardsAll message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgWithdrawDelegatorRewardsAll} MsgWithdrawDelegatorRewardsAll
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgWithdrawDelegatorRewardsAll.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgWithdrawDelegatorRewardsAll message.
             * @function verify
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgWithdrawDelegatorRewardsAll.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.delegatorAddr && typeof message.delegatorAddr.length === "number" || $util.isString(message.delegatorAddr)))
                    return "delegatorAddr: buffer expected";
                return null;
            };

            /**
             * Creates a MsgWithdrawDelegatorRewardsAll message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgWithdrawDelegatorRewardsAll} MsgWithdrawDelegatorRewardsAll
             */
            MsgWithdrawDelegatorRewardsAll.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgWithdrawDelegatorRewardsAll)
                    return object;
                var message = new $root.irisnet.tx.MsgWithdrawDelegatorRewardsAll();
                if (object.delegatorAddr != null)
                    if (typeof object.delegatorAddr === "string")
                        $util.base64.decode(object.delegatorAddr, message.delegatorAddr = $util.newBuffer($util.base64.length(object.delegatorAddr)), 0);
                    else if (object.delegatorAddr.length)
                        message.delegatorAddr = object.delegatorAddr;
                return message;
            };

            /**
             * Creates a plain object from a MsgWithdrawDelegatorRewardsAll message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @static
             * @param {irisnet.tx.MsgWithdrawDelegatorRewardsAll} message MsgWithdrawDelegatorRewardsAll
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgWithdrawDelegatorRewardsAll.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.delegatorAddr = "";
                    else {
                        object.delegatorAddr = [];
                        if (options.bytes !== Array)
                            object.delegatorAddr = $util.newBuffer(object.delegatorAddr);
                    }
                if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                    object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
                return object;
            };

            /**
             * Converts this MsgWithdrawDelegatorRewardsAll to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgWithdrawDelegatorRewardsAll
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgWithdrawDelegatorRewardsAll.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgWithdrawDelegatorRewardsAll;
        })();

        tx.MsgWithdrawDelegatorReward = (function() {

            /**
             * Properties of a MsgWithdrawDelegatorReward.
             * @memberof irisnet.tx
             * @interface IMsgWithdrawDelegatorReward
             * @property {Uint8Array} delegatorAddr MsgWithdrawDelegatorReward delegatorAddr
             * @property {Uint8Array} validatorAddr MsgWithdrawDelegatorReward validatorAddr
             */

            /**
             * Constructs a new MsgWithdrawDelegatorReward.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgWithdrawDelegatorReward.
             * @implements IMsgWithdrawDelegatorReward
             * @constructor
             * @param {irisnet.tx.IMsgWithdrawDelegatorReward=} [properties] Properties to set
             */
            function MsgWithdrawDelegatorReward(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgWithdrawDelegatorReward delegatorAddr.
             * @member {Uint8Array} delegatorAddr
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @instance
             */
            MsgWithdrawDelegatorReward.prototype.delegatorAddr = $util.newBuffer([]);

            /**
             * MsgWithdrawDelegatorReward validatorAddr.
             * @member {Uint8Array} validatorAddr
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @instance
             */
            MsgWithdrawDelegatorReward.prototype.validatorAddr = $util.newBuffer([]);

            /**
             * Creates a new MsgWithdrawDelegatorReward instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorReward=} [properties] Properties to set
             * @returns {irisnet.tx.MsgWithdrawDelegatorReward} MsgWithdrawDelegatorReward instance
             */
            MsgWithdrawDelegatorReward.create = function create(properties) {
                return new MsgWithdrawDelegatorReward(properties);
            };

            /**
             * Encodes the specified MsgWithdrawDelegatorReward message. Does not implicitly {@link irisnet.tx.MsgWithdrawDelegatorReward.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorReward} message MsgWithdrawDelegatorReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgWithdrawDelegatorReward.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.delegatorAddr);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.validatorAddr);
                return writer;
            };

            /**
             * Encodes the specified MsgWithdrawDelegatorReward message, length delimited. Does not implicitly {@link irisnet.tx.MsgWithdrawDelegatorReward.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {irisnet.tx.IMsgWithdrawDelegatorReward} message MsgWithdrawDelegatorReward message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgWithdrawDelegatorReward.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgWithdrawDelegatorReward message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgWithdrawDelegatorReward} MsgWithdrawDelegatorReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgWithdrawDelegatorReward.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgWithdrawDelegatorReward();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.delegatorAddr = reader.bytes();
                        break;
                    case 2:
                        message.validatorAddr = reader.bytes();
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
                return message;
            };

            /**
             * Decodes a MsgWithdrawDelegatorReward message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgWithdrawDelegatorReward} MsgWithdrawDelegatorReward
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgWithdrawDelegatorReward.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgWithdrawDelegatorReward message.
             * @function verify
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgWithdrawDelegatorReward.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.delegatorAddr && typeof message.delegatorAddr.length === "number" || $util.isString(message.delegatorAddr)))
                    return "delegatorAddr: buffer expected";
                if (!(message.validatorAddr && typeof message.validatorAddr.length === "number" || $util.isString(message.validatorAddr)))
                    return "validatorAddr: buffer expected";
                return null;
            };

            /**
             * Creates a MsgWithdrawDelegatorReward message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgWithdrawDelegatorReward} MsgWithdrawDelegatorReward
             */
            MsgWithdrawDelegatorReward.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgWithdrawDelegatorReward)
                    return object;
                var message = new $root.irisnet.tx.MsgWithdrawDelegatorReward();
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
                return message;
            };

            /**
             * Creates a plain object from a MsgWithdrawDelegatorReward message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @static
             * @param {irisnet.tx.MsgWithdrawDelegatorReward} message MsgWithdrawDelegatorReward
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgWithdrawDelegatorReward.toObject = function toObject(message, options) {
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
                }
                if (message.delegatorAddr != null && message.hasOwnProperty("delegatorAddr"))
                    object.delegatorAddr = options.bytes === String ? $util.base64.encode(message.delegatorAddr, 0, message.delegatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.delegatorAddr) : message.delegatorAddr;
                if (message.validatorAddr != null && message.hasOwnProperty("validatorAddr"))
                    object.validatorAddr = options.bytes === String ? $util.base64.encode(message.validatorAddr, 0, message.validatorAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.validatorAddr) : message.validatorAddr;
                return object;
            };

            /**
             * Converts this MsgWithdrawDelegatorReward to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgWithdrawDelegatorReward
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgWithdrawDelegatorReward.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgWithdrawDelegatorReward;
        })();

        tx.StdFee = (function() {

            /**
             * Properties of a StdFee.
             * @memberof irisnet.tx
             * @interface IStdFee
             * @property {Array.<irisnet.tx.ICoin>|null} [amount] StdFee amount
             * @property {number|Long} gas StdFee gas
             */

            /**
             * Constructs a new StdFee.
             * @memberof irisnet.tx
             * @classdesc Represents a StdFee.
             * @implements IStdFee
             * @constructor
             * @param {irisnet.tx.IStdFee=} [properties] Properties to set
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
             * @member {Array.<irisnet.tx.ICoin>} amount
             * @memberof irisnet.tx.StdFee
             * @instance
             */
            StdFee.prototype.amount = $util.emptyArray;

            /**
             * StdFee gas.
             * @member {number|Long} gas
             * @memberof irisnet.tx.StdFee
             * @instance
             */
            StdFee.prototype.gas = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new StdFee instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {irisnet.tx.IStdFee=} [properties] Properties to set
             * @returns {irisnet.tx.StdFee} StdFee instance
             */
            StdFee.create = function create(properties) {
                return new StdFee(properties);
            };

            /**
             * Encodes the specified StdFee message. Does not implicitly {@link irisnet.tx.StdFee.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {irisnet.tx.IStdFee} message StdFee message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdFee.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.amount != null && message.amount.length)
                    for (var i = 0; i < message.amount.length; ++i)
                        $root.irisnet.tx.Coin.encode(message.amount[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.gas);
                return writer;
            };

            /**
             * Encodes the specified StdFee message, length delimited. Does not implicitly {@link irisnet.tx.StdFee.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {irisnet.tx.IStdFee} message StdFee message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdFee.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StdFee message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.StdFee} StdFee
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StdFee.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.StdFee();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.amount && message.amount.length))
                            message.amount = [];
                        message.amount.push($root.irisnet.tx.Coin.decode(reader, reader.uint32()));
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
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.StdFee} StdFee
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
             * @memberof irisnet.tx.StdFee
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
                        var error = $root.irisnet.tx.Coin.verify(message.amount[i]);
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
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.StdFee} StdFee
             */
            StdFee.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.StdFee)
                    return object;
                var message = new $root.irisnet.tx.StdFee();
                if (object.amount) {
                    if (!Array.isArray(object.amount))
                        throw TypeError(".irisnet.tx.StdFee.amount: array expected");
                    message.amount = [];
                    for (var i = 0; i < object.amount.length; ++i) {
                        if (typeof object.amount[i] !== "object")
                            throw TypeError(".irisnet.tx.StdFee.amount: object expected");
                        message.amount[i] = $root.irisnet.tx.Coin.fromObject(object.amount[i]);
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
             * @memberof irisnet.tx.StdFee
             * @static
             * @param {irisnet.tx.StdFee} message StdFee
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
                        object.amount[j] = $root.irisnet.tx.Coin.toObject(message.amount[j], options);
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
             * @memberof irisnet.tx.StdFee
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StdFee.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StdFee;
        })();

        tx.StdSignature = (function() {

            /**
             * Properties of a StdSignature.
             * @memberof irisnet.tx
             * @interface IStdSignature
             * @property {Uint8Array} pubKey StdSignature pubKey
             * @property {Uint8Array} signature StdSignature signature
             * @property {number|Long} accountNumber StdSignature accountNumber
             * @property {number|Long} sequence StdSignature sequence
             */

            /**
             * Constructs a new StdSignature.
             * @memberof irisnet.tx
             * @classdesc Represents a StdSignature.
             * @implements IStdSignature
             * @constructor
             * @param {irisnet.tx.IStdSignature=} [properties] Properties to set
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
             * @memberof irisnet.tx.StdSignature
             * @instance
             */
            StdSignature.prototype.pubKey = $util.newBuffer([]);

            /**
             * StdSignature signature.
             * @member {Uint8Array} signature
             * @memberof irisnet.tx.StdSignature
             * @instance
             */
            StdSignature.prototype.signature = $util.newBuffer([]);

            /**
             * StdSignature accountNumber.
             * @member {number|Long} accountNumber
             * @memberof irisnet.tx.StdSignature
             * @instance
             */
            StdSignature.prototype.accountNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * StdSignature sequence.
             * @member {number|Long} sequence
             * @memberof irisnet.tx.StdSignature
             * @instance
             */
            StdSignature.prototype.sequence = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new StdSignature instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {irisnet.tx.IStdSignature=} [properties] Properties to set
             * @returns {irisnet.tx.StdSignature} StdSignature instance
             */
            StdSignature.create = function create(properties) {
                return new StdSignature(properties);
            };

            /**
             * Encodes the specified StdSignature message. Does not implicitly {@link irisnet.tx.StdSignature.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {irisnet.tx.IStdSignature} message StdSignature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdSignature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.pubKey);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);

                // ===========================整形过滤掉零值================================
                if (message.accountNumber !== 0) {
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.accountNumber);
                }
                // ===========================整形过滤掉零值================================
                if (message.sequence !== 0) {
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.sequence);
                }
                return writer;
            };

            /**
             * Encodes the specified StdSignature message, length delimited. Does not implicitly {@link irisnet.tx.StdSignature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {irisnet.tx.IStdSignature} message StdSignature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdSignature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StdSignature message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.StdSignature} StdSignature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StdSignature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.StdSignature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.pubKey = reader.bytes();
                        break;
                    case 2:
                        message.signature = reader.bytes();
                        break;
                    case 3:
                        message.accountNumber = reader.int64();
                        break;
                    case 4:
                        message.sequence = reader.int64();
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
                if (!message.hasOwnProperty("accountNumber"))
                    throw $util.ProtocolError("missing required 'accountNumber'", { instance: message });
                if (!message.hasOwnProperty("sequence"))
                    throw $util.ProtocolError("missing required 'sequence'", { instance: message });
                return message;
            };

            /**
             * Decodes a StdSignature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.StdSignature} StdSignature
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
             * @memberof irisnet.tx.StdSignature
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
                if (!$util.isInteger(message.accountNumber) && !(message.accountNumber && $util.isInteger(message.accountNumber.low) && $util.isInteger(message.accountNumber.high)))
                    return "accountNumber: integer|Long expected";
                if (!$util.isInteger(message.sequence) && !(message.sequence && $util.isInteger(message.sequence.low) && $util.isInteger(message.sequence.high)))
                    return "sequence: integer|Long expected";
                return null;
            };

            /**
             * Creates a StdSignature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.StdSignature} StdSignature
             */
            StdSignature.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.StdSignature)
                    return object;
                var message = new $root.irisnet.tx.StdSignature();
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
                if (object.accountNumber != null)
                    if ($util.Long)
                        (message.accountNumber = $util.Long.fromValue(object.accountNumber)).unsigned = false;
                    else if (typeof object.accountNumber === "string")
                        message.accountNumber = parseInt(object.accountNumber, 10);
                    else if (typeof object.accountNumber === "number")
                        message.accountNumber = object.accountNumber;
                    else if (typeof object.accountNumber === "object")
                        message.accountNumber = new $util.LongBits(object.accountNumber.low >>> 0, object.accountNumber.high >>> 0).toNumber();
                if (object.sequence != null)
                    if ($util.Long)
                        (message.sequence = $util.Long.fromValue(object.sequence)).unsigned = false;
                    else if (typeof object.sequence === "string")
                        message.sequence = parseInt(object.sequence, 10);
                    else if (typeof object.sequence === "number")
                        message.sequence = object.sequence;
                    else if (typeof object.sequence === "object")
                        message.sequence = new $util.LongBits(object.sequence.low >>> 0, object.sequence.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a StdSignature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.StdSignature
             * @static
             * @param {irisnet.tx.StdSignature} message StdSignature
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
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.accountNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.accountNumber = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sequence = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sequence = options.longs === String ? "0" : 0;
                }
                if (message.pubKey != null && message.hasOwnProperty("pubKey"))
                    object.pubKey = options.bytes === String ? $util.base64.encode(message.pubKey, 0, message.pubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.pubKey) : message.pubKey;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                if (message.accountNumber != null && message.hasOwnProperty("accountNumber"))
                    if (typeof message.accountNumber === "number")
                        object.accountNumber = options.longs === String ? String(message.accountNumber) : message.accountNumber;
                    else
                        object.accountNumber = options.longs === String ? $util.Long.prototype.toString.call(message.accountNumber) : options.longs === Number ? new $util.LongBits(message.accountNumber.low >>> 0, message.accountNumber.high >>> 0).toNumber() : message.accountNumber;
                if (message.sequence != null && message.hasOwnProperty("sequence"))
                    if (typeof message.sequence === "number")
                        object.sequence = options.longs === String ? String(message.sequence) : message.sequence;
                    else
                        object.sequence = options.longs === String ? $util.Long.prototype.toString.call(message.sequence) : options.longs === Number ? new $util.LongBits(message.sequence.low >>> 0, message.sequence.high >>> 0).toNumber() : message.sequence;
                return object;
            };

            /**
             * Converts this StdSignature to JSON.
             * @function toJSON
             * @memberof irisnet.tx.StdSignature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StdSignature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StdSignature;
        })();

        tx.StdTx = (function() {

            /**
             * Properties of a StdTx.
             * @memberof irisnet.tx
             * @interface IStdTx
             * @property {Array.<Uint8Array>|null} [msgs] StdTx msgs
             * @property {irisnet.tx.IStdFee} fee StdTx fee
             * @property {Array.<irisnet.tx.IStdSignature>|null} [signatures] StdTx signatures
             * @property {string|null} [memo] StdTx memo
             */

            /**
             * Constructs a new StdTx.
             * @memberof irisnet.tx
             * @classdesc Represents a StdTx.
             * @implements IStdTx
             * @constructor
             * @param {irisnet.tx.IStdTx=} [properties] Properties to set
             */
            function StdTx(properties) {
                this.msgs = [];
                this.signatures = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StdTx msgs.
             * @member {Array.<Uint8Array>} msgs
             * @memberof irisnet.tx.StdTx
             * @instance
             */
            StdTx.prototype.msgs = $util.emptyArray;

            /**
             * StdTx fee.
             * @member {irisnet.tx.IStdFee} fee
             * @memberof irisnet.tx.StdTx
             * @instance
             */
            StdTx.prototype.fee = null;

            /**
             * StdTx signatures.
             * @member {Array.<irisnet.tx.IStdSignature>} signatures
             * @memberof irisnet.tx.StdTx
             * @instance
             */
            StdTx.prototype.signatures = $util.emptyArray;

            /**
             * StdTx memo.
             * @member {string} memo
             * @memberof irisnet.tx.StdTx
             * @instance
             */
            StdTx.prototype.memo = "";

            /**
             * Creates a new StdTx instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {irisnet.tx.IStdTx=} [properties] Properties to set
             * @returns {irisnet.tx.StdTx} StdTx instance
             */
            StdTx.create = function create(properties) {
                return new StdTx(properties);
            };

            /**
             * Encodes the specified StdTx message. Does not implicitly {@link irisnet.tx.StdTx.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {irisnet.tx.IStdTx} message StdTx message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdTx.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.msgs != null && message.msgs.length)
                    for (var i = 0; i < message.msgs.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.msgs[i]);
                $root.irisnet.tx.StdFee.encode(message.fee, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.signatures != null && message.signatures.length)
                    for (var i = 0; i < message.signatures.length; ++i)
                        $root.irisnet.tx.StdSignature.encode(message.signatures[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.memo != null && message.hasOwnProperty("memo") && message.memo !== "")
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.memo);
                return writer;
            };

            /**
             * Encodes the specified StdTx message, length delimited. Does not implicitly {@link irisnet.tx.StdTx.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {irisnet.tx.IStdTx} message StdTx message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StdTx.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StdTx message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.StdTx} StdTx
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StdTx.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.StdTx();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.msgs && message.msgs.length))
                            message.msgs = [];
                        message.msgs.push(reader.bytes());
                        break;
                    case 2:
                        message.fee = $root.irisnet.tx.StdFee.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.signatures && message.signatures.length))
                            message.signatures = [];
                        message.signatures.push($root.irisnet.tx.StdSignature.decode(reader, reader.uint32()));
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
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.StdTx} StdTx
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
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StdTx.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.msgs != null && message.hasOwnProperty("msgs")) {
                    if (!Array.isArray(message.msgs))
                        return "msgs: array expected";
                    for (var i = 0; i < message.msgs.length; ++i)
                        if (!(message.msgs[i] && typeof message.msgs[i].length === "number" || $util.isString(message.msgs[i])))
                            return "msgs: buffer[] expected";
                }
                {
                    var error = $root.irisnet.tx.StdFee.verify(message.fee);
                    if (error)
                        return "fee." + error;
                }
                if (message.signatures != null && message.hasOwnProperty("signatures")) {
                    if (!Array.isArray(message.signatures))
                        return "signatures: array expected";
                    for (var i = 0; i < message.signatures.length; ++i) {
                        var error = $root.irisnet.tx.StdSignature.verify(message.signatures[i]);
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
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.StdTx} StdTx
             */
            StdTx.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.StdTx)
                    return object;
                var message = new $root.irisnet.tx.StdTx();
                if (object.msgs) {
                    if (!Array.isArray(object.msgs))
                        throw TypeError(".irisnet.tx.StdTx.msgs: array expected");
                    message.msgs = [];
                    for (var i = 0; i < object.msgs.length; ++i)
                        if (typeof object.msgs[i] === "string")
                            $util.base64.decode(object.msgs[i], message.msgs[i] = $util.newBuffer($util.base64.length(object.msgs[i])), 0);
                        else if (object.msgs[i].length)
                            message.msgs[i] = object.msgs[i];
                }
                if (object.fee != null) {
                    if (typeof object.fee !== "object")
                        throw TypeError(".irisnet.tx.StdTx.fee: object expected");
                    message.fee = $root.irisnet.tx.StdFee.fromObject(object.fee);
                }
                if (object.signatures) {
                    if (!Array.isArray(object.signatures))
                        throw TypeError(".irisnet.tx.StdTx.signatures: array expected");
                    message.signatures = [];
                    for (var i = 0; i < object.signatures.length; ++i) {
                        if (typeof object.signatures[i] !== "object")
                            throw TypeError(".irisnet.tx.StdTx.signatures: object expected");
                        message.signatures[i] = $root.irisnet.tx.StdSignature.fromObject(object.signatures[i]);
                    }
                }
                if (object.memo != null)
                    message.memo = String(object.memo);
                return message;
            };

            /**
             * Creates a plain object from a StdTx message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.StdTx
             * @static
             * @param {irisnet.tx.StdTx} message StdTx
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StdTx.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.msgs = [];
                    object.signatures = [];
                }
                if (options.defaults) {
                    object.fee = null;
                    object.memo = "";
                }
                if (message.msgs && message.msgs.length) {
                    object.msgs = [];
                    for (var j = 0; j < message.msgs.length; ++j)
                        object.msgs[j] = options.bytes === String ? $util.base64.encode(message.msgs[j], 0, message.msgs[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.msgs[j]) : message.msgs[j];
                }
                if (message.fee != null && message.hasOwnProperty("fee"))
                    object.fee = $root.irisnet.tx.StdFee.toObject(message.fee, options);
                if (message.signatures && message.signatures.length) {
                    object.signatures = [];
                    for (var j = 0; j < message.signatures.length; ++j)
                        object.signatures[j] = $root.irisnet.tx.StdSignature.toObject(message.signatures[j], options);
                }
                if (message.memo != null && message.hasOwnProperty("memo"))
                    object.memo = message.memo;
                return object;
            };

            /**
             * Converts this StdTx to JSON.
             * @function toJSON
             * @memberof irisnet.tx.StdTx
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StdTx.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StdTx;
        })();

        return tx;
    })();

    return irisnet;
})();

module.exports = $root;
