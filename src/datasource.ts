import { DataSourceInstanceSettings, CoreApp, ScopedVars } from '@grafana/data';
import { DataSourceWithBackend, getTemplateSrv } from '@grafana/runtime';

import { FirestoreQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';

const applyTemplateVariables = (query: FirestoreQuery, scopedVars: ScopedVars): FirestoreQuery => ({
  ...query,
  query: getTemplateSrv().replace(query.query, scopedVars),
});

export class DataSource extends DataSourceWithBackend<FirestoreQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  getDefaultQuery(_: CoreApp): Partial<FirestoreQuery> {
    return DEFAULT_QUERY;
  }

  interpolateVariablesInQueries(queries: FirestoreQuery[], scopedVars: ScopedVars = {}): FirestoreQuery[] {
    return queries.map((q) => applyTemplateVariables(q, scopedVars));
  }

  applyTemplateVariables(query: FirestoreQuery, scopedVars: ScopedVars): FirestoreQuery {
    return applyTemplateVariables(query, scopedVars);
  }
}
