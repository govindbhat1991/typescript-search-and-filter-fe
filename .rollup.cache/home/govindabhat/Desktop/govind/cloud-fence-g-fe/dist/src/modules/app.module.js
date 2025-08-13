import { __decorate } from "tslib";
import { Module } from 'src/core/decorators/decorator';
import { ComponentsModule } from 'src/lib/components.module';
import { ListingModule } from './listing/listing.module';
import { AppComponent } from './app.component';
/** Entry point of the modules */
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [ComponentsModule, ListingModule],
        components: [AppComponent],
        providers: [],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map