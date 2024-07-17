/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useEffect, useState } from 'react';

// import { useLocation } from 'react-router-dom';

import { css } from '@emotion/react';
// import { useValues } from 'kea';

import { useValues } from 'kea';

import {
  EuiBadge,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiSteps,
  EuiSuperSelect,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';

import { EuiStepInterface } from '@elastic/eui/src/components/steps/step';
import { i18n } from '@kbn/i18n';
// import { FormattedMessage } from '@kbn/i18n-react';

import { KibanaLogic } from '../../../../shared/kibana';
import { EnterpriseSearchContentPageTemplate } from '../../layout';
import { connectorsBreadcrumbs } from '../connectors';

import connectorsBackgroundImage from './assets/connector_logos_comp.png';

import { ConfigurationStep } from './configuration_step';
import { DeploymentStep } from './deployment_step';
import { FinishUpStep } from './finish_up_step';
import { StartStep } from './start_step';

export const CreateConnector: React.FC = () => {
  const { euiTheme } = useEuiTheme();
  const [selfManaged, setSelfManaged] = useState(false);
  const { connectorTypes } = useValues(KibanaLogic);
  const allConnectors = connectorTypes.sort((a, b) => a.name.localeCompare(b.name)); // alphabetically ordered
  const [startStepStatus, setStartStepStatus] = useState<
    | 'current'
    | 'incomplete'
    | 'disabled'
    | 'loading'
    | 'warning'
    | 'danger'
    | 'complete'
    | undefined
  >('current');

  const [deploymentStepStatus, setDeploymentStepStatus] = useState<
    | 'current'
    | 'incomplete'
    | 'disabled'
    | 'loading'
    | 'warning'
    | 'danger'
    | 'complete'
    | undefined
  >('incomplete');

  const [configurationStepStatus, setConfigurationStepStatus] = useState<
    | 'current'
    | 'incomplete'
    | 'disabled'
    | 'loading'
    | 'warning'
    | 'danger'
    | 'complete'
    | undefined
  >('incomplete');

  const [finishUpStepStatus, setFinishUpStepStatus] = useState<
    | 'current'
    | 'incomplete'
    | 'disabled'
    | 'loading'
    | 'warning'
    | 'danger'
    | 'complete'
    | undefined
  >('incomplete');

  const [currentStep, setCurrentStep] = useState(0);
  const [connectorSelected, setConnectorSelected] = useState('');

  interface CustomEuiStepInterface extends EuiStepInterface {
    content: JSX.Element;
  }
  const selfManagedSteps: CustomEuiStepInterface[] = [
    {
      children: <EuiSpacer size="xs" />,
      content: (
        <StartStep
          title={i18n.translate('xpack.enterpriseSearch.createConnector.startStep.startLabel', {
            defaultMessage: 'Start',
          })}
          setSelfManaged={setSelfManaged}
          selfManaged={selfManaged}
          setConnectorSelected={setConnectorSelected}
          connectorSelected={connectorSelected}
          allConnectors={allConnectors}
        />
      ),
      status: startStepStatus,
      title: i18n.translate('xpack.enterpriseSearch.createConnector.startStep.startLabel', {
        defaultMessage: 'Start',
      }),
    },
    {
      children: '',
      content: <DeploymentStep />,

      status: deploymentStepStatus,
      title: i18n.translate(
        'xpack.enterpriseSearch.createConnector.deploymentStep.deploymentLabel',
        { defaultMessage: 'Deployment' }
      ),
    },
    {
      children: '',
      content: (
        <ConfigurationStep
          title={i18n.translate(
            'xpack.enterpriseSearch.createConnector.configurationStep.configurationLabel',
            { defaultMessage: 'Configuration' }
          )}
        />
      ),
      status: configurationStepStatus,
      title: i18n.translate(
        'xpack.enterpriseSearch.createConnector.configurationStep.configurationLabel',
        { defaultMessage: 'Configuration' }
      ),
    },
    {
      children: '',

      content: (
        <FinishUpStep
          title={i18n.translate(
            'xpack.enterpriseSearch.createConnector.finishUpStep.finishUpLabel',
            { defaultMessage: 'Finish up' }
          )}
        />
      ),
      status: finishUpStepStatus,
      title: i18n.translate('xpack.enterpriseSearch.createConnector.finishUpStep.finishUpLabel', {
        defaultMessage: 'Finish up',
      }),
    },
  ];

  const elasticManagedSteps: CustomEuiStepInterface[] = [
    {
      children: <EuiSpacer size="xs" />,
      content: (
        <StartStep
          title={i18n.translate('xpack.enterpriseSearch.createConnector.startStep.startLabel', {
            defaultMessage: 'Start',
          })}
          setSelfManaged={setSelfManaged}
          selfManaged={selfManaged}
          setConnectorSelected={setConnectorSelected}
          connectorSelected={connectorSelected}
          allConnectors={allConnectors}
        />
      ),
      status: startStepStatus,
      title: i18n.translate('xpack.enterpriseSearch.createConnector.startStep.startLabel', {
        defaultMessage: i18n.translate(
          'xpack.enterpriseSearch.createConnector.startStep.startLabel',
          {
            defaultMessage: 'Start',
          }
        ),
      }),
    },
    {
      children: '',
      content: (
        <ConfigurationStep
          title={i18n.translate(
            'xpack.enterpriseSearch.createConnector.configurationStep.configurationLabel',
            { defaultMessage: 'Configuration' }
          )}
        />
      ),
      status: configurationStepStatus,
      title: i18n.translate(
        'xpack.enterpriseSearch.createConnector.configurationStep.configurationLabel',
        { defaultMessage: 'Configuration' }
      ),
    },
    {
      children: '',
      content: (
        <FinishUpStep
          title={i18n.translate(
            'xpack.enterpriseSearch.createConnector.finishUpStep.finishUpLabel',
            { defaultMessage: 'Finish up' }
          )}
        />
      ),
      status: finishUpStepStatus,
      title: i18n.translate('xpack.enterpriseSearch.createConnector.finishUpStep.finishUpLabel', {
        defaultMessage: 'Finish up',
      }),
    },
  ];

  const updateStep = (action: string) => {
    const allSteps = selfManaged === true ? selfManagedSteps : elasticManagedSteps;
    switch (action) {
      case 'next':
        if (currentStep === allSteps.length - 1) {
          return;
        }
        setCurrentStep(currentStep + 1);
        break;
      case 'back':
        if (currentStep === 0) {
          return;
        }
        setCurrentStep(currentStep - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selfManaged === true) {
      switch (currentStep) {
        case 0:
          setStartStepStatus('current');
          setDeploymentStepStatus('incomplete');
          setConfigurationStepStatus('incomplete');
          setFinishUpStepStatus('incomplete');
          break;
        case 1:
          setStartStepStatus('complete');
          setDeploymentStepStatus('current');
          setConfigurationStepStatus('incomplete');
          setFinishUpStepStatus('incomplete');
          break;
        case 2:
          setStartStepStatus('complete');
          setDeploymentStepStatus('complete');
          setConfigurationStepStatus('current');
          setFinishUpStepStatus('incomplete');
          break;
        case 3:
          setStartStepStatus('complete');
          setDeploymentStepStatus('complete');
          setConfigurationStepStatus('complete');
          setFinishUpStepStatus('current');
          break;
        default:
          break;
      }
    } else {
      switch (currentStep) {
        case 0:
          setStartStepStatus('current');
          setConfigurationStepStatus('incomplete');
          setFinishUpStepStatus('incomplete');
          break;
        case 1:
          setStartStepStatus('complete');
          setConfigurationStepStatus('current');
          setFinishUpStepStatus('incomplete');
          break;
        case 2:
          setStartStepStatus('complete');
          setConfigurationStepStatus('complete');
          setFinishUpStepStatus('current');
          break;
        default:
          break;
      }
    }
  }, [currentStep]);

  useEffect(() => {
    // console.log(allConnectors);
  }, []);

  return (
    <EnterpriseSearchContentPageTemplate
      pageChrome={[
        ...connectorsBreadcrumbs,
        i18n.translate('xpack.enterpriseSearch.content.indices.selectConnector.breadcrumb', {
          defaultMessage: 'New connector',
        }),
      ]}
      pageViewTelemetry="create_connector"
      isLoading={false}
      pageHeader={{
        description: i18n.translate(
          'xpack.enterpriseSearch.content.indices.selectConnector.description',
          {
            defaultMessage:
              'Extract, transform, index and sync data from a third-party data source.',
          }
        ),
        pageTitle: i18n.translate('xpack.enterpriseSearch.content.indices.selectConnector.title', {
          defaultMessage: 'Create a connector',
        }),
      }}
    >
      <EuiFlexGroup gutterSize="m">
        {/* Col 1 */}
        <EuiFlexItem grow={2}>
          <EuiPanel
            hasShadow={false}
            hasBorder
            color="subdued"
            paddingSize="l"
            css={css`
              ${currentStep === 0 ? `background-image: url(${connectorsBackgroundImage});` : ''}
              background-size: contain;
              background-repeat: no-repeat;
              background-position: bottom center;
              min-height: 600px;
            `}
          >
            <EuiFlexGroup>
              <EuiButtonEmpty
                data-test-subj="enterpriseSearchCreateConnectorBackButton"
                iconType="arrowLeft"
                size="s"
                onClick={() => updateStep('back')}
              >
                {i18n.translate('xpack.enterpriseSearch.createConnector.backButtonEmptyLabel', {
                  defaultMessage: 'Back',
                })}
              </EuiButtonEmpty>
              <EuiButtonEmpty
                data-test-subj="enterpriseSearchCreateConnectorNextButton"
                iconSide="right"
                iconType="arrowRight"
                size="s"
                onClick={() => updateStep('next')}
              >
                {i18n.translate('xpack.enterpriseSearch.createConnector.nextButtonEmptyLabel', {
                  defaultMessage: 'Next',
                })}
              </EuiButtonEmpty>
            </EuiFlexGroup>

            <EuiSpacer size="xl" />
            <EuiSteps
              titleSize="xxs"
              steps={selfManaged === true ? selfManagedSteps : elasticManagedSteps}
              css={() => css`
                .euiStep__content {
                  padding-block-end: ${euiTheme.size.m};
                }
              `}
            />
            {currentStep > 0 && (
              <>
                <EuiSpacer size="xl" />
                <EuiFormRow
                  label={i18n.translate(
                    'xpack.enterpriseSearch.createConnector.euiFormRow.connectorLabel',
                    { defaultMessage: 'Connector' }
                  )}
                >
                  <EuiSuperSelect
                    readOnly
                    valueOfSelected="item1"
                    options={[{ inputDisplay: connectorSelected, value: 'item1' }]}
                  />
                </EuiFormRow>
                <EuiSpacer size="s" />
                <EuiText size="s">
                  <p>
                    <EuiLink
                      data-test-subj="enterpriseSearchCreateConnectorConnectorDocsLink"
                      href="http://www.elastic.co"
                      target="_blank"
                    >
                      {connectorSelected}{' '}
                      {i18n.translate(
                        'xpack.enterpriseSearch.createConnector.connectorDocsLinkLabel',
                        { defaultMessage: 'connector docs' }
                      )}
                    </EuiLink>
                  </p>
                </EuiText>
                <EuiSpacer size="s" />
                <EuiBadge color="hollow">
                  {selfManaged ? 'Self managed' : 'Elastic managed'}
                </EuiBadge>
              </>
            )}
          </EuiPanel>
        </EuiFlexItem>
        {/* Col 2 */}
        <EuiFlexItem grow={7}>
          {selfManaged === true
            ? selfManagedSteps[currentStep].content
            : elasticManagedSteps[currentStep].content}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EnterpriseSearchContentPageTemplate>
  );
};
