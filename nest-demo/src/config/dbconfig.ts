export const loadConfig = () => {
  const { env } = process;
  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: env.TYPEORM_PORT,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      entities: env.TYPEORM_ENTITIES,
    },
  };
};
