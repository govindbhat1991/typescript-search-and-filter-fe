import { Module } from 'src/core/decorators/decorator';
import { ButtonModule } from './buttons/button/button.module';
import { IconModule } from './misc/icon/icon.module';

/** Entry point of the component lib */
@Module({
    imports: [ButtonModule, IconModule],
    components: [],
    providers: [],
})
export class ComponentsModule {}
