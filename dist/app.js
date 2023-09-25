"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const index_1 = __importDefault(require("./routers/cities_route/index"));
const index_2 = __importDefault(require("./routers/temperatures_route/index"));
const forecast_route_1 = __importDefault(require("./routers/forecast_route"));
const webhooks_routes_1 = __importDefault(require("./routers/webhooks_routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbConfig_1.default.authenticate();
        console.log("database connected");
        app.listen(port, () => { console.log('Server is running on', port); });
    }
    catch (error) {
        console.error('database connection failed');
    }
});
connection();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/cities', index_1.default);
app.use('/temperatures', index_2.default);
app.use('/forecasts', forecast_route_1.default);
app.use('/webhooks', webhooks_routes_1.default);
