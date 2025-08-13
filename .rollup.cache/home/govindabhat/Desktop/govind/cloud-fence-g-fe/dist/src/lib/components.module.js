import { __decorate } from "tslib";
import { Module } from 'src/core/decorators/decorator';
import { ButtonModule } from './buttons/button/button.module';
import { IconModule } from './misc/icon/icon.module';
/** Entry point of the component lib */
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = __decorate([
    Module({
        imports: [ButtonModule, IconModule],
        components: [],
        providers: [],
    })
], ComponentsModule);
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map