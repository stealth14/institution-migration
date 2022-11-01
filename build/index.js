"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populate = void 0;
var pg_1 = require("pg");
var pg_cursor_1 = __importDefault(require("pg-cursor"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
function populate() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, client, text, cursor;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pool = new pg_1.Pool({
                        user: process.env.PGUSER,
                        host: process.env.PGHOST,
                        database: process.env.PGDATABASE,
                        password: process.env.PGPASS,
                        port: Number(process.env.PGPORT),
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    text = 'SELECT * FROM alerts';
                    cursor = client.query(new pg_cursor_1.default(text));
                    cursor.read(100, function (err, rows) { return __awaiter(_this, void 0, void 0, function () {
                        var addColumnSentence, _i, rows_1, alert, code, institution, res, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    addColumnSentence = "\n    ALTER TABLE follow_alerts\n    ADD instcode_res_id varchar(8);\n    ";
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 7, , 8]);
                                    return [4 /*yield*/, pool.query(addColumnSentence)];
                                case 2:
                                    _a.sent();
                                    _i = 0, rows_1 = rows;
                                    _a.label = 3;
                                case 3:
                                    if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                                    alert = rows_1[_i];
                                    code = alert.code, institution = alert.institution;
                                    return [4 /*yield*/, pool.query("UPDATE follow_alerts\n            SET instcode_res_id = '".concat(institution, "'\n            WHERE alert_code = '").concat(code, "'"))];
                                case 4:
                                    res = _a.sent();
                                    // eslint-disable-next-line no-console
                                    console.log(res);
                                    _a.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    error_1 = _a.sent();
                                    // eslint-disable-next-line no-console
                                    console.log(' === CONTROLLED ERROR === \n', error_1);
                                    return [3 /*break*/, 8];
                                case 8:
                                    cursor.close(function () {
                                        client.release();
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.populate = populate;
populate();
