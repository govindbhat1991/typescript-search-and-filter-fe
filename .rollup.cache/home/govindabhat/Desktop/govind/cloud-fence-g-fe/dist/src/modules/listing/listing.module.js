import { __decorate } from "tslib";
import { Module } from 'src/core/decorators/decorator';
import { FilterModule } from './filter/filter.module';
import { ReactiveList } from './listing.component';
import { PaginationModule } from './pagination/pagination.module';
import { ReactiveTest } from './reactive-test.component';
import { SearchModule } from './search/search.module';
import { TestInjectionToken } from './shared/reactive-test.constants';
import { ReactiveTestService } from './shared/reactive-test.service';
import { SortModule } from './sort/sort.module';
let ListingModule = class ListingModule {
};
ListingModule = __decorate([
    Module({
        imports: [FilterModule, PaginationModule, SearchModule, SortModule],
        components: [ReactiveTest, ReactiveList],
        providers: [{ provide: TestInjectionToken, useClass: ReactiveTestService }],
    })
], ListingModule);
export { ListingModule };
//# sourceMappingURL=listing.module.js.map