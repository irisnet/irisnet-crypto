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

        tx.MsgDeposit = (function() {

            /**
             * Properties of a MsgDeposit.
             * @memberof irisnet.tx
             * @interface IMsgDeposit
             * @property {number|Long} proposalID MsgDeposit proposalID
             * @property {Uint8Array} depositor MsgDeposit depositor
             * @property {Array.<irisnet.tx.ICoin>|null} [amount] MsgDeposit amount
             */

            /**
             * Constructs a new MsgDeposit.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgDeposit.
             * @implements IMsgDeposit
             * @constructor
             * @param {irisnet.tx.IMsgDeposit=} [properties] Properties to set
             */
            function MsgDeposit(properties) {
                this.amount = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgDeposit proposalID.
             * @member {number|Long} proposalID
             * @memberof irisnet.tx.MsgDeposit
             * @instance
             */
            MsgDeposit.prototype.proposalID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgDeposit depositor.
             * @member {Uint8Array} depositor
             * @memberof irisnet.tx.MsgDeposit
             * @instance
             */
            MsgDeposit.prototype.depositor = $util.newBuffer([]);

            /**
             * MsgDeposit amount.
             * @member {Array.<irisnet.tx.ICoin>} amount
             * @memberof irisnet.tx.MsgDeposit
             * @instance
             */
            MsgDeposit.prototype.amount = $util.emptyArray;

            /**
             * Creates a new MsgDeposit instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {irisnet.tx.IMsgDeposit=} [properties] Properties to set
             * @returns {irisnet.tx.MsgDeposit} MsgDeposit instance
             */
            MsgDeposit.create = function create(properties) {
                return new MsgDeposit(properties);
            };

            /**
             * Encodes the specified MsgDeposit message. Does not implicitly {@link irisnet.tx.MsgDeposit.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {irisnet.tx.IMsgDeposit} message MsgDeposit message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgDeposit.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.proposalID);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.depositor);
                if (message.amount != null && message.amount.length)
                    for (var i = 0; i < message.amount.length; ++i)
                        $root.irisnet.tx.Coin.encode(message.amount[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link irisnet.tx.MsgDeposit.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {irisnet.tx.IMsgDeposit} message MsgDeposit message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgDeposit.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgDeposit message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgDeposit} MsgDeposit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgDeposit.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgDeposit();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.proposalID = reader.int64();
                            break;
                        case 2:
                            message.depositor = reader.bytes();
                            break;
                        case 3:
                            if (!(message.amount && message.amount.length))
                                message.amount = [];
                            message.amount.push($root.irisnet.tx.Coin.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("proposalID"))
                    throw $util.ProtocolError("missing required 'proposalID'", { instance: message });
                if (!message.hasOwnProperty("depositor"))
                    throw $util.ProtocolError("missing required 'depositor'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgDeposit} MsgDeposit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgDeposit.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgDeposit message.
             * @function verify
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgDeposit.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.proposalID) && !(message.proposalID && $util.isInteger(message.proposalID.low) && $util.isInteger(message.proposalID.high)))
                    return "proposalID: integer|Long expected";
                if (!(message.depositor && typeof message.depositor.length === "number" || $util.isString(message.depositor)))
                    return "depositor: buffer expected";
                if (message.amount != null && message.hasOwnProperty("amount")) {
                    if (!Array.isArray(message.amount))
                        return "amount: array expected";
                    for (var i = 0; i < message.amount.length; ++i) {
                        var error = $root.irisnet.tx.Coin.verify(message.amount[i]);
                        if (error)
                            return "amount." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgDeposit} MsgDeposit
             */
            MsgDeposit.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgDeposit)
                    return object;
                var message = new $root.irisnet.tx.MsgDeposit();
                if (object.proposalID != null)
                    if ($util.Long)
                        (message.proposalID = $util.Long.fromValue(object.proposalID)).unsigned = false;
                    else if (typeof object.proposalID === "string")
                        message.proposalID = parseInt(object.proposalID, 10);
                    else if (typeof object.proposalID === "number")
                        message.proposalID = object.proposalID;
                    else if (typeof object.proposalID === "object")
                        message.proposalID = new $util.LongBits(object.proposalID.low >>> 0, object.proposalID.high >>> 0).toNumber();
                if (object.depositor != null)
                    if (typeof object.depositor === "string")
                        $util.base64.decode(object.depositor, message.depositor = $util.newBuffer($util.base64.length(object.depositor)), 0);
                    else if (object.depositor.length)
                        message.depositor = object.depositor;
                if (object.amount) {
                    if (!Array.isArray(object.amount))
                        throw TypeError(".irisnet.tx.MsgDeposit.amount: array expected");
                    message.amount = [];
                    for (var i = 0; i < object.amount.length; ++i) {
                        if (typeof object.amount[i] !== "object")
                            throw TypeError(".irisnet.tx.MsgDeposit.amount: object expected");
                        message.amount[i] = $root.irisnet.tx.Coin.fromObject(object.amount[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgDeposit
             * @static
             * @param {irisnet.tx.MsgDeposit} message MsgDeposit
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgDeposit.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.amount = [];
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.proposalID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.proposalID = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.depositor = "";
                    else {
                        object.depositor = [];
                        if (options.bytes !== Array)
                            object.depositor = $util.newBuffer(object.depositor);
                    }
                }
                if (message.proposalID != null && message.hasOwnProperty("proposalID"))
                    if (typeof message.proposalID === "number")
                        object.proposalID = options.longs === String ? String(message.proposalID) : message.proposalID;
                    else
                        object.proposalID = options.longs === String ? $util.Long.prototype.toString.call(message.proposalID) : options.longs === Number ? new $util.LongBits(message.proposalID.low >>> 0, message.proposalID.high >>> 0).toNumber() : message.proposalID;
                if (message.depositor != null && message.hasOwnProperty("depositor"))
                    object.depositor = options.bytes === String ? $util.base64.encode(message.depositor, 0, message.depositor.length) : options.bytes === Array ? Array.prototype.slice.call(message.depositor) : message.depositor;
                if (message.amount && message.amount.length) {
                    object.amount = [];
                    for (var j = 0; j < message.amount.length; ++j)
                        object.amount[j] = $root.irisnet.tx.Coin.toObject(message.amount[j], options);
                }
                return object;
            };

            /**
             * Converts this MsgDeposit to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgDeposit
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgDeposit.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgDeposit;
        })();

        tx.MsgVote = (function() {

            /**
             * Properties of a MsgVote.
             * @memberof irisnet.tx
             * @interface IMsgVote
             * @property {number|Long} proposalID MsgVote proposalID
             * @property {Uint8Array} voter MsgVote voter
             * @property {number|Long} option MsgVote option
             */

            /**
             * Constructs a new MsgVote.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgVote.
             * @implements IMsgVote
             * @constructor
             * @param {irisnet.tx.IMsgVote=} [properties] Properties to set
             */
            function MsgVote(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgVote proposalID.
             * @member {number|Long} proposalID
             * @memberof irisnet.tx.MsgVote
             * @instance
             */
            MsgVote.prototype.proposalID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgVote voter.
             * @member {Uint8Array} voter
             * @memberof irisnet.tx.MsgVote
             * @instance
             */
            MsgVote.prototype.voter = $util.newBuffer([]);

            /**
             * MsgVote option.
             * @member {number|Long} option
             * @memberof irisnet.tx.MsgVote
             * @instance
             */
            MsgVote.prototype.option = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new MsgVote instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {irisnet.tx.IMsgVote=} [properties] Properties to set
             * @returns {irisnet.tx.MsgVote} MsgVote instance
             */
            MsgVote.create = function create(properties) {
                return new MsgVote(properties);
            };

            /**
             * Encodes the specified MsgVote message. Does not implicitly {@link irisnet.tx.MsgVote.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {irisnet.tx.IMsgVote} message MsgVote message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgVote.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.proposalID);
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.voter);
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.option);
                return writer;
            };

            /**
             * Encodes the specified MsgVote message, length delimited. Does not implicitly {@link irisnet.tx.MsgVote.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {irisnet.tx.IMsgVote} message MsgVote message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgVote.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgVote message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgVote} MsgVote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgVote.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgVote();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.proposalID = reader.int64();
                            break;
                        case 2:
                            message.voter = reader.bytes();
                            break;
                        case 3:
                            message.option = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("proposalID"))
                    throw $util.ProtocolError("missing required 'proposalID'", { instance: message });
                if (!message.hasOwnProperty("voter"))
                    throw $util.ProtocolError("missing required 'voter'", { instance: message });
                if (!message.hasOwnProperty("option"))
                    throw $util.ProtocolError("missing required 'option'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgVote message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgVote} MsgVote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgVote.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgVote message.
             * @function verify
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgVote.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.proposalID) && !(message.proposalID && $util.isInteger(message.proposalID.low) && $util.isInteger(message.proposalID.high)))
                    return "proposalID: integer|Long expected";
                if (!(message.voter && typeof message.voter.length === "number" || $util.isString(message.voter)))
                    return "voter: buffer expected";
                if (!$util.isInteger(message.option) && !(message.option && $util.isInteger(message.option.low) && $util.isInteger(message.option.high)))
                    return "option: integer|Long expected";
                return null;
            };

            /**
             * Creates a MsgVote message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgVote} MsgVote
             */
            MsgVote.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgVote)
                    return object;
                var message = new $root.irisnet.tx.MsgVote();
                if (object.proposalID != null)
                    if ($util.Long)
                        (message.proposalID = $util.Long.fromValue(object.proposalID)).unsigned = false;
                    else if (typeof object.proposalID === "string")
                        message.proposalID = parseInt(object.proposalID, 10);
                    else if (typeof object.proposalID === "number")
                        message.proposalID = object.proposalID;
                    else if (typeof object.proposalID === "object")
                        message.proposalID = new $util.LongBits(object.proposalID.low >>> 0, object.proposalID.high >>> 0).toNumber();
                if (object.voter != null)
                    if (typeof object.voter === "string")
                        $util.base64.decode(object.voter, message.voter = $util.newBuffer($util.base64.length(object.voter)), 0);
                    else if (object.voter.length)
                        message.voter = object.voter;
                if (object.option != null)
                    if ($util.Long)
                        (message.option = $util.Long.fromValue(object.option)).unsigned = true;
                    else if (typeof object.option === "string")
                        message.option = parseInt(object.option, 10);
                    else if (typeof object.option === "number")
                        message.option = object.option;
                    else if (typeof object.option === "object")
                        message.option = new $util.LongBits(object.option.low >>> 0, object.option.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a MsgVote message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgVote
             * @static
             * @param {irisnet.tx.MsgVote} message MsgVote
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgVote.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.proposalID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.proposalID = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.voter = "";
                    else {
                        object.voter = [];
                        if (options.bytes !== Array)
                            object.voter = $util.newBuffer(object.voter);
                    }
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.option = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.option = options.longs === String ? "0" : 0;
                }
                if (message.proposalID != null && message.hasOwnProperty("proposalID"))
                    if (typeof message.proposalID === "number")
                        object.proposalID = options.longs === String ? String(message.proposalID) : message.proposalID;
                    else
                        object.proposalID = options.longs === String ? $util.Long.prototype.toString.call(message.proposalID) : options.longs === Number ? new $util.LongBits(message.proposalID.low >>> 0, message.proposalID.high >>> 0).toNumber() : message.proposalID;
                if (message.voter != null && message.hasOwnProperty("voter"))
                    object.voter = options.bytes === String ? $util.base64.encode(message.voter, 0, message.voter.length) : options.bytes === Array ? Array.prototype.slice.call(message.voter) : message.voter;
                if (message.option != null && message.hasOwnProperty("option"))
                    if (typeof message.option === "number")
                        object.option = options.longs === String ? String(message.option) : message.option;
                    else
                        object.option = options.longs === String ? $util.Long.prototype.toString.call(message.option) : options.longs === Number ? new $util.LongBits(message.option.low >>> 0, message.option.high >>> 0).toNumber(true) : message.option;
                return object;
            };

            /**
             * Converts this MsgVote to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgVote
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgVote.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgVote;
        })();

        tx.SwapInput = (function() {

            /**
             * Properties of a SwapInput.
             * @memberof irisnet.tx
             * @interface ISwapInput
             * @property {Uint8Array} address SwapInput address
             * @property {irisnet.tx.ICoin} coin SwapInput coin
             */

            /**
             * Constructs a new SwapInput.
             * @memberof irisnet.tx
             * @classdesc Represents a SwapInput.
             * @implements ISwapInput
             * @constructor
             * @param {irisnet.tx.ISwapInput=} [properties] Properties to set
             */
            function SwapInput(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SwapInput address.
             * @member {Uint8Array} address
             * @memberof irisnet.tx.SwapInput
             * @instance
             */
            SwapInput.prototype.address = $util.newBuffer([]);

            /**
             * SwapInput coin.
             * @member {irisnet.tx.ICoin} coin
             * @memberof irisnet.tx.SwapInput
             * @instance
             */
            SwapInput.prototype.coin = null;

            /**
             * Creates a new SwapInput instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {irisnet.tx.ISwapInput=} [properties] Properties to set
             * @returns {irisnet.tx.SwapInput} SwapInput instance
             */
            SwapInput.create = function create(properties) {
                return new SwapInput(properties);
            };

            /**
             * Encodes the specified SwapInput message. Does not implicitly {@link irisnet.tx.SwapInput.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {irisnet.tx.ISwapInput} message SwapInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SwapInput.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                $root.irisnet.tx.Coin.encode(message.coin, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SwapInput message, length delimited. Does not implicitly {@link irisnet.tx.SwapInput.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {irisnet.tx.ISwapInput} message SwapInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SwapInput.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SwapInput message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.SwapInput} SwapInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SwapInput.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.SwapInput();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.address = reader.bytes();
                            break;
                        case 2:
                            message.coin = $root.irisnet.tx.Coin.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("address"))
                    throw $util.ProtocolError("missing required 'address'", { instance: message });
                if (!message.hasOwnProperty("coin"))
                    throw $util.ProtocolError("missing required 'coin'", { instance: message });
                return message;
            };

            /**
             * Decodes a SwapInput message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.SwapInput} SwapInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SwapInput.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SwapInput message.
             * @function verify
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SwapInput.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
                {
                    var error = $root.irisnet.tx.Coin.verify(message.coin);
                    if (error)
                        return "coin." + error;
                }
                return null;
            };

            /**
             * Creates a SwapInput message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.SwapInput} SwapInput
             */
            SwapInput.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.SwapInput)
                    return object;
                var message = new $root.irisnet.tx.SwapInput();
                if (object.address != null)
                    if (typeof object.address === "string")
                        $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                    else if (object.address.length)
                        message.address = object.address;
                if (object.coin != null) {
                    if (typeof object.coin !== "object")
                        throw TypeError(".irisnet.tx.SwapInput.coin: object expected");
                    message.coin = $root.irisnet.tx.Coin.fromObject(object.coin);
                }
                return message;
            };

            /**
             * Creates a plain object from a SwapInput message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.SwapInput
             * @static
             * @param {irisnet.tx.SwapInput} message SwapInput
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SwapInput.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.address = "";
                    else {
                        object.address = [];
                        if (options.bytes !== Array)
                            object.address = $util.newBuffer(object.address);
                    }
                    object.coin = null;
                }
                if (message.address != null && message.hasOwnProperty("address"))
                    object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                if (message.coin != null && message.hasOwnProperty("coin"))
                    object.coin = $root.irisnet.tx.Coin.toObject(message.coin, options);
                return object;
            };

            /**
             * Converts this SwapInput to JSON.
             * @function toJSON
             * @memberof irisnet.tx.SwapInput
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SwapInput.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SwapInput;
        })();

        tx.SwapOutput = (function() {

            /**
             * Properties of a SwapOutput.
             * @memberof irisnet.tx
             * @interface ISwapOutput
             * @property {Uint8Array} address SwapOutput address
             * @property {irisnet.tx.ICoin} coin SwapOutput coin
             */

            /**
             * Constructs a new SwapOutput.
             * @memberof irisnet.tx
             * @classdesc Represents a SwapOutput.
             * @implements ISwapOutput
             * @constructor
             * @param {irisnet.tx.ISwapOutput=} [properties] Properties to set
             */
            function SwapOutput(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SwapOutput address.
             * @member {Uint8Array} address
             * @memberof irisnet.tx.SwapOutput
             * @instance
             */
            SwapOutput.prototype.address = $util.newBuffer([]);

            /**
             * SwapOutput coin.
             * @member {irisnet.tx.ICoin} coin
             * @memberof irisnet.tx.SwapOutput
             * @instance
             */
            SwapOutput.prototype.coin = null;

            /**
             * Creates a new SwapOutput instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {irisnet.tx.ISwapOutput=} [properties] Properties to set
             * @returns {irisnet.tx.SwapOutput} SwapOutput instance
             */
            SwapOutput.create = function create(properties) {
                return new SwapOutput(properties);
            };

            /**
             * Encodes the specified SwapOutput message. Does not implicitly {@link irisnet.tx.SwapOutput.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {irisnet.tx.ISwapOutput} message SwapOutput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SwapOutput.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                $root.irisnet.tx.Coin.encode(message.coin, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SwapOutput message, length delimited. Does not implicitly {@link irisnet.tx.SwapOutput.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {irisnet.tx.ISwapOutput} message SwapOutput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SwapOutput.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SwapOutput message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.SwapOutput} SwapOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SwapOutput.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.SwapOutput();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.address = reader.bytes();
                            break;
                        case 2:
                            message.coin = $root.irisnet.tx.Coin.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("address"))
                    throw $util.ProtocolError("missing required 'address'", { instance: message });
                if (!message.hasOwnProperty("coin"))
                    throw $util.ProtocolError("missing required 'coin'", { instance: message });
                return message;
            };

            /**
             * Decodes a SwapOutput message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.SwapOutput} SwapOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SwapOutput.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SwapOutput message.
             * @function verify
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SwapOutput.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
                {
                    var error = $root.irisnet.tx.Coin.verify(message.coin);
                    if (error)
                        return "coin." + error;
                }
                return null;
            };

            /**
             * Creates a SwapOutput message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.SwapOutput} SwapOutput
             */
            SwapOutput.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.SwapOutput)
                    return object;
                var message = new $root.irisnet.tx.SwapOutput();
                if (object.address != null)
                    if (typeof object.address === "string")
                        $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                    else if (object.address.length)
                        message.address = object.address;
                if (object.coin != null) {
                    if (typeof object.coin !== "object")
                        throw TypeError(".irisnet.tx.SwapOutput.coin: object expected");
                    message.coin = $root.irisnet.tx.Coin.fromObject(object.coin);
                }
                return message;
            };

            /**
             * Creates a plain object from a SwapOutput message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.SwapOutput
             * @static
             * @param {irisnet.tx.SwapOutput} message SwapOutput
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SwapOutput.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.address = "";
                    else {
                        object.address = [];
                        if (options.bytes !== Array)
                            object.address = $util.newBuffer(object.address);
                    }
                    object.coin = null;
                }
                if (message.address != null && message.hasOwnProperty("address"))
                    object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                if (message.coin != null && message.hasOwnProperty("coin"))
                    object.coin = $root.irisnet.tx.Coin.toObject(message.coin, options);
                return object;
            };

            /**
             * Converts this SwapOutput to JSON.
             * @function toJSON
             * @memberof irisnet.tx.SwapOutput
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SwapOutput.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SwapOutput;
        })();

        tx.MsgSwapOrder = (function() {

            /**
             * Properties of a MsgSwapOrder.
             * @memberof irisnet.tx
             * @interface IMsgSwapOrder
             * @property {irisnet.tx.ISwapInput} input MsgSwapOrder input
             * @property {irisnet.tx.ISwapOutput} output MsgSwapOrder output
             * @property {number|Long} deadline MsgSwapOrder deadline
             * @property {boolean} isBuyOrder MsgSwapOrder isBuyOrder
             */

            /**
             * Constructs a new MsgSwapOrder.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgSwapOrder.
             * @implements IMsgSwapOrder
             * @constructor
             * @param {irisnet.tx.IMsgSwapOrder=} [properties] Properties to set
             */
            function MsgSwapOrder(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgSwapOrder input.
             * @member {irisnet.tx.ISwapInput} input
             * @memberof irisnet.tx.MsgSwapOrder
             * @instance
             */
            MsgSwapOrder.prototype.input = null;

            /**
             * MsgSwapOrder output.
             * @member {irisnet.tx.ISwapOutput} output
             * @memberof irisnet.tx.MsgSwapOrder
             * @instance
             */
            MsgSwapOrder.prototype.output = null;

            /**
             * MsgSwapOrder deadline.
             * @member {number|Long} deadline
             * @memberof irisnet.tx.MsgSwapOrder
             * @instance
             */
            MsgSwapOrder.prototype.deadline = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgSwapOrder isBuyOrder.
             * @member {boolean} isBuyOrder
             * @memberof irisnet.tx.MsgSwapOrder
             * @instance
             */
            MsgSwapOrder.prototype.isBuyOrder = false;

            /**
             * Creates a new MsgSwapOrder instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {irisnet.tx.IMsgSwapOrder=} [properties] Properties to set
             * @returns {irisnet.tx.MsgSwapOrder} MsgSwapOrder instance
             */
            MsgSwapOrder.create = function create(properties) {
                return new MsgSwapOrder(properties);
            };

            /**
             * Encodes the specified MsgSwapOrder message. Does not implicitly {@link irisnet.tx.MsgSwapOrder.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {irisnet.tx.IMsgSwapOrder} message MsgSwapOrder message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgSwapOrder.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.irisnet.tx.SwapInput.encode(message.input, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                $root.irisnet.tx.SwapOutput.encode(message.output, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.deadline);
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isBuyOrder);
                return writer;
            };

            /**
             * Encodes the specified MsgSwapOrder message, length delimited. Does not implicitly {@link irisnet.tx.MsgSwapOrder.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {irisnet.tx.IMsgSwapOrder} message MsgSwapOrder message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgSwapOrder.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgSwapOrder message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgSwapOrder} MsgSwapOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgSwapOrder.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgSwapOrder();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.input = $root.irisnet.tx.SwapInput.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.output = $root.irisnet.tx.SwapOutput.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.deadline = reader.int64();
                            break;
                        case 4:
                            message.isBuyOrder = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("input"))
                    throw $util.ProtocolError("missing required 'input'", { instance: message });
                if (!message.hasOwnProperty("output"))
                    throw $util.ProtocolError("missing required 'output'", { instance: message });
                if (!message.hasOwnProperty("deadline"))
                    throw $util.ProtocolError("missing required 'deadline'", { instance: message });
                if (!message.hasOwnProperty("isBuyOrder"))
                    throw $util.ProtocolError("missing required 'isBuyOrder'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgSwapOrder message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgSwapOrder} MsgSwapOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgSwapOrder.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgSwapOrder message.
             * @function verify
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgSwapOrder.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.irisnet.tx.SwapInput.verify(message.input);
                    if (error)
                        return "input." + error;
                }
                {
                    var error = $root.irisnet.tx.SwapOutput.verify(message.output);
                    if (error)
                        return "output." + error;
                }
                if (!$util.isInteger(message.deadline) && !(message.deadline && $util.isInteger(message.deadline.low) && $util.isInteger(message.deadline.high)))
                    return "deadline: integer|Long expected";
                if (typeof message.isBuyOrder !== "boolean")
                    return "isBuyOrder: boolean expected";
                return null;
            };

            /**
             * Creates a MsgSwapOrder message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgSwapOrder} MsgSwapOrder
             */
            MsgSwapOrder.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgSwapOrder)
                    return object;
                var message = new $root.irisnet.tx.MsgSwapOrder();
                if (object.input != null) {
                    if (typeof object.input !== "object")
                        throw TypeError(".irisnet.tx.MsgSwapOrder.input: object expected");
                    message.input = $root.irisnet.tx.SwapInput.fromObject(object.input);
                }
                if (object.output != null) {
                    if (typeof object.output !== "object")
                        throw TypeError(".irisnet.tx.MsgSwapOrder.output: object expected");
                    message.output = $root.irisnet.tx.SwapOutput.fromObject(object.output);
                }
                if (object.deadline != null)
                    if ($util.Long)
                        (message.deadline = $util.Long.fromValue(object.deadline)).unsigned = false;
                    else if (typeof object.deadline === "string")
                        message.deadline = parseInt(object.deadline, 10);
                    else if (typeof object.deadline === "number")
                        message.deadline = object.deadline;
                    else if (typeof object.deadline === "object")
                        message.deadline = new $util.LongBits(object.deadline.low >>> 0, object.deadline.high >>> 0).toNumber();
                if (object.isBuyOrder != null)
                    message.isBuyOrder = Boolean(object.isBuyOrder);
                return message;
            };

            /**
             * Creates a plain object from a MsgSwapOrder message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgSwapOrder
             * @static
             * @param {irisnet.tx.MsgSwapOrder} message MsgSwapOrder
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgSwapOrder.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.input = null;
                    object.output = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.deadline = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.deadline = options.longs === String ? "0" : 0;
                    object.isBuyOrder = false;
                }
                if (message.input != null && message.hasOwnProperty("input"))
                    object.input = $root.irisnet.tx.SwapInput.toObject(message.input, options);
                if (message.output != null && message.hasOwnProperty("output"))
                    object.output = $root.irisnet.tx.SwapOutput.toObject(message.output, options);
                if (message.deadline != null && message.hasOwnProperty("deadline"))
                    if (typeof message.deadline === "number")
                        object.deadline = options.longs === String ? String(message.deadline) : message.deadline;
                    else
                        object.deadline = options.longs === String ? $util.Long.prototype.toString.call(message.deadline) : options.longs === Number ? new $util.LongBits(message.deadline.low >>> 0, message.deadline.high >>> 0).toNumber() : message.deadline;
                if (message.isBuyOrder != null && message.hasOwnProperty("isBuyOrder"))
                    object.isBuyOrder = message.isBuyOrder;
                return object;
            };

            /**
             * Converts this MsgSwapOrder to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgSwapOrder
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgSwapOrder.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgSwapOrder;
        })();

        tx.MsgAddLiquidity = (function() {

            /**
             * Properties of a MsgAddLiquidity.
             * @memberof irisnet.tx
             * @interface IMsgAddLiquidity
             * @property {irisnet.tx.ICoin} maxToken MsgAddLiquidity maxToken
             * @property {string} exactIrisAmt MsgAddLiquidity exactIrisAmt
             * @property {string} minLiquidity MsgAddLiquidity minLiquidity
             * @property {number|Long} deadline MsgAddLiquidity deadline
             * @property {Uint8Array} sender MsgAddLiquidity sender
             */

            /**
             * Constructs a new MsgAddLiquidity.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgAddLiquidity.
             * @implements IMsgAddLiquidity
             * @constructor
             * @param {irisnet.tx.IMsgAddLiquidity=} [properties] Properties to set
             */
            function MsgAddLiquidity(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgAddLiquidity maxToken.
             * @member {irisnet.tx.ICoin} maxToken
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             */
            MsgAddLiquidity.prototype.maxToken = null;

            /**
             * MsgAddLiquidity exactIrisAmt.
             * @member {string} exactIrisAmt
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             */
            MsgAddLiquidity.prototype.exactIrisAmt = "";

            /**
             * MsgAddLiquidity minLiquidity.
             * @member {string} minLiquidity
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             */
            MsgAddLiquidity.prototype.minLiquidity = "";

            /**
             * MsgAddLiquidity deadline.
             * @member {number|Long} deadline
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             */
            MsgAddLiquidity.prototype.deadline = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgAddLiquidity sender.
             * @member {Uint8Array} sender
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             */
            MsgAddLiquidity.prototype.sender = $util.newBuffer([]);

            /**
             * Creates a new MsgAddLiquidity instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {irisnet.tx.IMsgAddLiquidity=} [properties] Properties to set
             * @returns {irisnet.tx.MsgAddLiquidity} MsgAddLiquidity instance
             */
            MsgAddLiquidity.create = function create(properties) {
                return new MsgAddLiquidity(properties);
            };

            /**
             * Encodes the specified MsgAddLiquidity message. Does not implicitly {@link irisnet.tx.MsgAddLiquidity.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {irisnet.tx.IMsgAddLiquidity} message MsgAddLiquidity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgAddLiquidity.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.irisnet.tx.Coin.encode(message.maxToken, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.exactIrisAmt);
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.minLiquidity);
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.deadline);
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.sender);
                return writer;
            };

            /**
             * Encodes the specified MsgAddLiquidity message, length delimited. Does not implicitly {@link irisnet.tx.MsgAddLiquidity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {irisnet.tx.IMsgAddLiquidity} message MsgAddLiquidity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgAddLiquidity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgAddLiquidity message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgAddLiquidity} MsgAddLiquidity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgAddLiquidity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgAddLiquidity();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.maxToken = $root.irisnet.tx.Coin.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.exactIrisAmt = reader.string();
                            break;
                        case 3:
                            message.minLiquidity = reader.string();
                            break;
                        case 4:
                            message.deadline = reader.int64();
                            break;
                        case 5:
                            message.sender = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("maxToken"))
                    throw $util.ProtocolError("missing required 'maxToken'", { instance: message });
                if (!message.hasOwnProperty("exactIrisAmt"))
                    throw $util.ProtocolError("missing required 'exactIrisAmt'", { instance: message });
                if (!message.hasOwnProperty("minLiquidity"))
                    throw $util.ProtocolError("missing required 'minLiquidity'", { instance: message });
                if (!message.hasOwnProperty("deadline"))
                    throw $util.ProtocolError("missing required 'deadline'", { instance: message });
                if (!message.hasOwnProperty("sender"))
                    throw $util.ProtocolError("missing required 'sender'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgAddLiquidity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgAddLiquidity} MsgAddLiquidity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgAddLiquidity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgAddLiquidity message.
             * @function verify
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgAddLiquidity.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.irisnet.tx.Coin.verify(message.maxToken);
                    if (error)
                        return "maxToken." + error;
                }
                if (!$util.isString(message.exactIrisAmt))
                    return "exactIrisAmt: string expected";
                if (!$util.isString(message.minLiquidity))
                    return "minLiquidity: string expected";
                if (!$util.isInteger(message.deadline) && !(message.deadline && $util.isInteger(message.deadline.low) && $util.isInteger(message.deadline.high)))
                    return "deadline: integer|Long expected";
                if (!(message.sender && typeof message.sender.length === "number" || $util.isString(message.sender)))
                    return "sender: buffer expected";
                return null;
            };

            /**
             * Creates a MsgAddLiquidity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgAddLiquidity} MsgAddLiquidity
             */
            MsgAddLiquidity.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgAddLiquidity)
                    return object;
                var message = new $root.irisnet.tx.MsgAddLiquidity();
                if (object.maxToken != null) {
                    if (typeof object.maxToken !== "object")
                        throw TypeError(".irisnet.tx.MsgAddLiquidity.maxToken: object expected");
                    message.maxToken = $root.irisnet.tx.Coin.fromObject(object.maxToken);
                }
                if (object.exactIrisAmt != null)
                    message.exactIrisAmt = String(object.exactIrisAmt);
                if (object.minLiquidity != null)
                    message.minLiquidity = String(object.minLiquidity);
                if (object.deadline != null)
                    if ($util.Long)
                        (message.deadline = $util.Long.fromValue(object.deadline)).unsigned = false;
                    else if (typeof object.deadline === "string")
                        message.deadline = parseInt(object.deadline, 10);
                    else if (typeof object.deadline === "number")
                        message.deadline = object.deadline;
                    else if (typeof object.deadline === "object")
                        message.deadline = new $util.LongBits(object.deadline.low >>> 0, object.deadline.high >>> 0).toNumber();
                if (object.sender != null)
                    if (typeof object.sender === "string")
                        $util.base64.decode(object.sender, message.sender = $util.newBuffer($util.base64.length(object.sender)), 0);
                    else if (object.sender.length)
                        message.sender = object.sender;
                return message;
            };

            /**
             * Creates a plain object from a MsgAddLiquidity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgAddLiquidity
             * @static
             * @param {irisnet.tx.MsgAddLiquidity} message MsgAddLiquidity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgAddLiquidity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.maxToken = null;
                    object.exactIrisAmt = "";
                    object.minLiquidity = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.deadline = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.deadline = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.sender = "";
                    else {
                        object.sender = [];
                        if (options.bytes !== Array)
                            object.sender = $util.newBuffer(object.sender);
                    }
                }
                if (message.maxToken != null && message.hasOwnProperty("maxToken"))
                    object.maxToken = $root.irisnet.tx.Coin.toObject(message.maxToken, options);
                if (message.exactIrisAmt != null && message.hasOwnProperty("exactIrisAmt"))
                    object.exactIrisAmt = message.exactIrisAmt;
                if (message.minLiquidity != null && message.hasOwnProperty("minLiquidity"))
                    object.minLiquidity = message.minLiquidity;
                if (message.deadline != null && message.hasOwnProperty("deadline"))
                    if (typeof message.deadline === "number")
                        object.deadline = options.longs === String ? String(message.deadline) : message.deadline;
                    else
                        object.deadline = options.longs === String ? $util.Long.prototype.toString.call(message.deadline) : options.longs === Number ? new $util.LongBits(message.deadline.low >>> 0, message.deadline.high >>> 0).toNumber() : message.deadline;
                if (message.sender != null && message.hasOwnProperty("sender"))
                    object.sender = options.bytes === String ? $util.base64.encode(message.sender, 0, message.sender.length) : options.bytes === Array ? Array.prototype.slice.call(message.sender) : message.sender;
                return object;
            };

            /**
             * Converts this MsgAddLiquidity to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgAddLiquidity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgAddLiquidity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgAddLiquidity;
        })();

        tx.MsgRemoveLiquidity = (function() {

            /**
             * Properties of a MsgRemoveLiquidity.
             * @memberof irisnet.tx
             * @interface IMsgRemoveLiquidity
             * @property {string} minToken MsgRemoveLiquidity minToken
             * @property {irisnet.tx.ICoin} withdrawLiquidity MsgRemoveLiquidity withdrawLiquidity
             * @property {string} minIrisAmt MsgRemoveLiquidity minIrisAmt
             * @property {number|Long} deadline MsgRemoveLiquidity deadline
             * @property {Uint8Array} sender MsgRemoveLiquidity sender
             */

            /**
             * Constructs a new MsgRemoveLiquidity.
             * @memberof irisnet.tx
             * @classdesc Represents a MsgRemoveLiquidity.
             * @implements IMsgRemoveLiquidity
             * @constructor
             * @param {irisnet.tx.IMsgRemoveLiquidity=} [properties] Properties to set
             */
            function MsgRemoveLiquidity(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgRemoveLiquidity minToken.
             * @member {string} minToken
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             */
            MsgRemoveLiquidity.prototype.minToken = "";

            /**
             * MsgRemoveLiquidity withdrawLiquidity.
             * @member {irisnet.tx.ICoin} withdrawLiquidity
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             */
            MsgRemoveLiquidity.prototype.withdrawLiquidity = null;

            /**
             * MsgRemoveLiquidity minIrisAmt.
             * @member {string} minIrisAmt
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             */
            MsgRemoveLiquidity.prototype.minIrisAmt = "";

            /**
             * MsgRemoveLiquidity deadline.
             * @member {number|Long} deadline
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             */
            MsgRemoveLiquidity.prototype.deadline = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgRemoveLiquidity sender.
             * @member {Uint8Array} sender
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             */
            MsgRemoveLiquidity.prototype.sender = $util.newBuffer([]);

            /**
             * Creates a new MsgRemoveLiquidity instance using the specified properties.
             * @function create
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {irisnet.tx.IMsgRemoveLiquidity=} [properties] Properties to set
             * @returns {irisnet.tx.MsgRemoveLiquidity} MsgRemoveLiquidity instance
             */
            MsgRemoveLiquidity.create = function create(properties) {
                return new MsgRemoveLiquidity(properties);
            };

            /**
             * Encodes the specified MsgRemoveLiquidity message. Does not implicitly {@link irisnet.tx.MsgRemoveLiquidity.verify|verify} messages.
             * @function encode
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {irisnet.tx.IMsgRemoveLiquidity} message MsgRemoveLiquidity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgRemoveLiquidity.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.minToken);
                $root.irisnet.tx.Coin.encode(message.withdrawLiquidity, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.minIrisAmt);
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.deadline);
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.sender);
                return writer;
            };

            /**
             * Encodes the specified MsgRemoveLiquidity message, length delimited. Does not implicitly {@link irisnet.tx.MsgRemoveLiquidity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {irisnet.tx.IMsgRemoveLiquidity} message MsgRemoveLiquidity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgRemoveLiquidity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgRemoveLiquidity message from the specified reader or buffer.
             * @function decode
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {irisnet.tx.MsgRemoveLiquidity} MsgRemoveLiquidity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgRemoveLiquidity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.irisnet.tx.MsgRemoveLiquidity();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.minToken = reader.string();
                            break;
                        case 2:
                            message.withdrawLiquidity = $root.irisnet.tx.Coin.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.minIrisAmt = reader.string();
                            break;
                        case 4:
                            message.deadline = reader.int64();
                            break;
                        case 5:
                            message.sender = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                if (!message.hasOwnProperty("minToken"))
                    throw $util.ProtocolError("missing required 'minToken'", { instance: message });
                if (!message.hasOwnProperty("withdrawLiquidity"))
                    throw $util.ProtocolError("missing required 'withdrawLiquidity'", { instance: message });
                if (!message.hasOwnProperty("minIrisAmt"))
                    throw $util.ProtocolError("missing required 'minIrisAmt'", { instance: message });
                if (!message.hasOwnProperty("deadline"))
                    throw $util.ProtocolError("missing required 'deadline'", { instance: message });
                if (!message.hasOwnProperty("sender"))
                    throw $util.ProtocolError("missing required 'sender'", { instance: message });
                return message;
            };

            /**
             * Decodes a MsgRemoveLiquidity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {irisnet.tx.MsgRemoveLiquidity} MsgRemoveLiquidity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgRemoveLiquidity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgRemoveLiquidity message.
             * @function verify
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgRemoveLiquidity.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.minToken))
                    return "minToken: string expected";
                {
                    var error = $root.irisnet.tx.Coin.verify(message.withdrawLiquidity);
                    if (error)
                        return "withdrawLiquidity." + error;
                }
                if (!$util.isString(message.minIrisAmt))
                    return "minIrisAmt: string expected";
                if (!$util.isInteger(message.deadline) && !(message.deadline && $util.isInteger(message.deadline.low) && $util.isInteger(message.deadline.high)))
                    return "deadline: integer|Long expected";
                if (!(message.sender && typeof message.sender.length === "number" || $util.isString(message.sender)))
                    return "sender: buffer expected";
                return null;
            };

            /**
             * Creates a MsgRemoveLiquidity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {irisnet.tx.MsgRemoveLiquidity} MsgRemoveLiquidity
             */
            MsgRemoveLiquidity.fromObject = function fromObject(object) {
                if (object instanceof $root.irisnet.tx.MsgRemoveLiquidity)
                    return object;
                var message = new $root.irisnet.tx.MsgRemoveLiquidity();
                if (object.minToken != null)
                    message.minToken = String(object.minToken);
                if (object.withdrawLiquidity != null) {
                    if (typeof object.withdrawLiquidity !== "object")
                        throw TypeError(".irisnet.tx.MsgRemoveLiquidity.withdrawLiquidity: object expected");
                    message.withdrawLiquidity = $root.irisnet.tx.Coin.fromObject(object.withdrawLiquidity);
                }
                if (object.minIrisAmt != null)
                    message.minIrisAmt = String(object.minIrisAmt);
                if (object.deadline != null)
                    if ($util.Long)
                        (message.deadline = $util.Long.fromValue(object.deadline)).unsigned = false;
                    else if (typeof object.deadline === "string")
                        message.deadline = parseInt(object.deadline, 10);
                    else if (typeof object.deadline === "number")
                        message.deadline = object.deadline;
                    else if (typeof object.deadline === "object")
                        message.deadline = new $util.LongBits(object.deadline.low >>> 0, object.deadline.high >>> 0).toNumber();
                if (object.sender != null)
                    if (typeof object.sender === "string")
                        $util.base64.decode(object.sender, message.sender = $util.newBuffer($util.base64.length(object.sender)), 0);
                    else if (object.sender.length)
                        message.sender = object.sender;
                return message;
            };

            /**
             * Creates a plain object from a MsgRemoveLiquidity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @static
             * @param {irisnet.tx.MsgRemoveLiquidity} message MsgRemoveLiquidity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgRemoveLiquidity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.minToken = "";
                    object.withdrawLiquidity = null;
                    object.minIrisAmt = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.deadline = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.deadline = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.sender = "";
                    else {
                        object.sender = [];
                        if (options.bytes !== Array)
                            object.sender = $util.newBuffer(object.sender);
                    }
                }
                if (message.minToken != null && message.hasOwnProperty("minToken"))
                    object.minToken = message.minToken;
                if (message.withdrawLiquidity != null && message.hasOwnProperty("withdrawLiquidity"))
                    object.withdrawLiquidity = $root.irisnet.tx.Coin.toObject(message.withdrawLiquidity, options);
                if (message.minIrisAmt != null && message.hasOwnProperty("minIrisAmt"))
                    object.minIrisAmt = message.minIrisAmt;
                if (message.deadline != null && message.hasOwnProperty("deadline"))
                    if (typeof message.deadline === "number")
                        object.deadline = options.longs === String ? String(message.deadline) : message.deadline;
                    else
                        object.deadline = options.longs === String ? $util.Long.prototype.toString.call(message.deadline) : options.longs === Number ? new $util.LongBits(message.deadline.low >>> 0, message.deadline.high >>> 0).toNumber() : message.deadline;
                if (message.sender != null && message.hasOwnProperty("sender"))
                    object.sender = options.bytes === String ? $util.base64.encode(message.sender, 0, message.sender.length) : options.bytes === Array ? Array.prototype.slice.call(message.sender) : message.sender;
                return object;
            };

            /**
             * Converts this MsgRemoveLiquidity to JSON.
             * @function toJSON
             * @memberof irisnet.tx.MsgRemoveLiquidity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgRemoveLiquidity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MsgRemoveLiquidity;
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
