"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var search_component_1 = require("./components/search/search.component");
var appRoutes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: search_component_1.SearchComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map