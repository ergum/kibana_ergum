/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useEffect, useState } from 'react';

import {
  EuiBadge,
  EuiIcon,
  EuiInputPopover,
  EuiSelectable,
  EuiSelectableOption,
  useEuiTheme,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

interface ChooseConnectorSelectableProps {
  allConnectors: Array<{
    description: string;
    iconPath: string;
    isBeta: boolean;
    isNative: boolean;
    isTechPreview: boolean;
    name: string;
  }>;
  connectorSelected: any;
  selfManaged: boolean;
  setConnectorSelected: Function;
  setSelfManaged: Function;
}
interface OptionData {
  secondaryContent?: string;
}

export const ChooseConnectorSelectable: React.FC<ChooseConnectorSelectableProps> = ({
  setConnectorSelected,
  connectorSelected,
  selfManaged,
  setSelfManaged,
  allConnectors,
}) => {
  const { euiTheme } = useEuiTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [selectableOptions, selectableSetOptions] = useState<
    Array<EuiSelectableOption<OptionData>>
  >([]);
  const initialOptions = allConnectors.map(
    (
      connector: {
        description: string;
        iconPath: string;
        isBeta: boolean;
        isNative: boolean;
        isTechPreview: boolean;
        name: string;
      },
      key
    ): EuiSelectableOption => {
      const append: JSX.Element[] = [];
      if (connector.isTechPreview) {
        append.push(
          <EuiBadge iconType="beaker" color="hollow">
            {i18n.translate(
              'xpack.enterpriseSearch.chooseConnectorSelectable.thechPreviewBadgeLabel',
              { defaultMessage: 'Thech preview' }
            )}
          </EuiBadge>
        );
      }
      if (connector.isBeta) {
        append.push(
          <EuiBadge iconType={'beta'} color="hollow">
            {i18n.translate('xpack.enterpriseSearch.chooseConnectorSelectable.BetaBadgeLabel', {
              defaultMessage: 'Beta',
            })}
          </EuiBadge>
        );
      }
      if (!selfManaged && !connector.isNative) {
        append.push(
          <EuiBadge iconType={'warning'} color="warning">
            {i18n.translate(
              'xpack.enterpriseSearch.chooseConnectorSelectable.OnlySelfManagedBadgeLabel',
              {
                defaultMessage: 'Self managed',
              }
            )}
          </EuiBadge>
        );
      }

      return {
        append,
        key: key.toString(),
        label: connector.name,
        prepend: <EuiIcon size="l" type={connector.iconPath} />,
      };
    }
  );

  useEffect(() => {
    selectableSetOptions(initialOptions);
  }, []);

  // Rest of the code...

  useEffect(() => {
    // Setting options when changing the radiobutton to self managed but it doesn't update the values for disable nor badges
    selectableSetOptions(initialOptions);
  }, [selfManaged]);

  return (
    <EuiSelectable
      aria-label={i18n.translate(
        'xpack.enterpriseSearch.chooseConnectorSelectable.euiSelectable.selectableInputPopoverLabel',
        { defaultMessage: 'Selectable + input popover example' }
      )}
      options={selectableOptions}
      onChange={(newOptions, event, changedOption) => {
        selectableSetOptions(newOptions);
        setIsOpen(false);
        if (changedOption.checked === 'on') {
          const keySelected = Number(changedOption.key);
          setConnectorSelected(allConnectors[keySelected]);
          setIsSearching(false);

          if (!allConnectors[keySelected].isNative && !selfManaged) {
            setSelfManaged(true);
          }
        } else {
          setConnectorSelected('');
        }
      }}
      listProps={{
        css: {
          '.euiSelectableListItem': { alignItems: 'center' },
          '.euiSelectableList__list': { maxBlockSize: 200 },
        },
        isVirtualized: true,
        rowHeight: Number(euiTheme.base * 3),
        showIcons: false,
      }}
      singleSelection
      searchable
      searchProps={{
        fullWidth: true,
        isClearable: true,
        onChange: (value) => {
          setConnectorSelected({ name: value });
          setIsSearching(true);
        },
        onClick: () => setIsOpen(true),
        onFocus: () => setIsOpen(true),
        onKeyDown: (event) => {
          if (event.key === 'Tab') return setIsOpen(false);
          if (event.key !== 'Escape') return setIsOpen(true);
        },
        placeholder: 'Choose a data source',
        value: connectorSelected.name,
      }}
      isPreFiltered={isSearching ? false : { highlightSearch: false }} // Shows the full list when not actively typing to search
    >
      {(list, search) => (
        <EuiInputPopover
          fullWidth
          closePopover={() => setIsOpen(false)}
          disableFocusTrap
          closeOnScroll
          isOpen={isOpen}
          input={search!}
          panelPaddingSize="none"
        >
          {list}
        </EuiInputPopover>
      )}
    </EuiSelectable>
  );
};
