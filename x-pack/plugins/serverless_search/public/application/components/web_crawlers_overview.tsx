/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiLink, EuiPageTemplate, EuiText } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import React, { useMemo } from 'react';

import { CRAWLER } from '../constants';

import { LEARN_MORE_LABEL } from '../../../common/i18n_string';

import { useKibanaServices } from '../hooks/use_kibana';
import { EmptyWebCrawlersPrompt } from './web_crawlers/empty_web_crawlers_prompt';

// import { CONNECTORS } from '../constants';

export const WebCrawlersOverview = () => {
  const { console: consolePlugin } = useKibanaServices();

  const embeddableConsole = useMemo(
    () => (consolePlugin?.EmbeddableConsole ? <consolePlugin.EmbeddableConsole /> : null),
    [consolePlugin]
  );

  return (
    <EuiPageTemplate offset={0} grow restrictWidth data-test-subj="svlSearchConnectorsPage">
      <EuiPageTemplate.Header
        pageTitle={i18n.translate('xpack.serverlessSearch.webcrawlers.title', {
          defaultMessage: 'Web crawlers',
        })}
        data-test-subj="serverlessSearchConnectorsTitle"
        restrictWidth
      >
        <EuiText>
          <p>
            <FormattedMessage
              id="xpack.serverlessSearch.webcrawlers.headerContent"
              defaultMessage="Discover extract and index searchable content from websites and knowledge bases {learnMoreLink}"
              values={{
                learnMoreLink: (
                  <EuiLink
                    data-test-subj="serverlessSearchConnectorsLearnMoreLink"
                    external
                    target="_blank"
                    href={CRAWLER.github_repo}
                  >
                    {LEARN_MORE_LABEL}
                  </EuiLink>
                ),
              }}
            />
          </p>
        </EuiText>
      </EuiPageTemplate.Header>
      <EuiPageTemplate.Section restrictWidth color="subdued">
        <EmptyWebCrawlersPrompt />
      </EuiPageTemplate.Section>
      {embeddableConsole}
    </EuiPageTemplate>
  );
};
