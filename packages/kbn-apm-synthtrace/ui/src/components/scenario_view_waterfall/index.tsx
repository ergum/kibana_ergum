import React from 'react';

import Branch from './branch';
import { useScenarioContext } from '../../context/use_scenario_context';
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';

export const ScenarioViewWaterfall = () => {
  const { state } = useScenarioContext();
  const { service } = state;
  const { children } = service || {};
  if (!service || !children) {
    return null;
  }

  return (
    <EuiPanel>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <Branch key={service.id} item={service} level={0} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
