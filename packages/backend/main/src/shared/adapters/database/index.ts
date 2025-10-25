import TypeOrmAdapter from '@shared/infra/database/typeorm/adapter';
import typeormSource from '@shared/infra/database/typeorm/source';

import IDatabaseAdapter from './IDatabaseAdapter';

const databaseAdapter: IDatabaseAdapter = new TypeOrmAdapter(typeormSource);

export default databaseAdapter;
