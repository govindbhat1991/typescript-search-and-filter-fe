import { Module } from 'src/core/decorators/decorator';
import { ComponentsModule } from 'src/lib/components.module';
import { ListingModule } from './listing/listing.module';
import { AppComponent } from './app.component';

/** Entry point of the modules */
@Module({
    imports: [ComponentsModule, ListingModule],
    components: [AppComponent],
    providers: [],
})
export class AppModule {}
