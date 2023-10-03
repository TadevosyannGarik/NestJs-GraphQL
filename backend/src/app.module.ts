import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env',  }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
	  		autoSchemaFile: 'graphql.schema.graphql',
			sortSchema: true,
			playground: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: async (config: ConfigService) => ({
				type: config.get<'postgres'>('TYPEORM_CONNECTION'),
				host: config.get<string>('TYPEORM_HOST'),
				username: config.get<string>('TYPEORM_USERNAME'),
				password: config.get<string>('TYPEORM_PASSWORD'),
				database: config.get<string>('TYPEORM_DATABASE'),
				port: config.get<number>('TYPEORM_PORT'),
				entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
				synchronize: true,
				autoLoadEntities: true,
				logging: true,
			}),
		}),
		UserModule,
	],
	providers: [],
})
export class AppModule {
}