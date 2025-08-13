import { Module } from 'src/core/decorators/decorator';
import { SearchComponent } from './search.component';

@Module({
    imports: [],
    components: [SearchComponent],
    providers: [],
})
export class SearchModule {}
