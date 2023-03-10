import React from 'react';
import {BillingInformationScreen} from '../../screens/billing-information';
import {PersonalInformationScreen} from '../../screens/personal-information';
import {useStack} from '../navigation/stack-pager';
import {SectionListHeader} from './section-list-header';
import {SectionListItem} from './section-list-item';

interface SettingsSectionListProps {
  sectionName: string;
}

export const SettingsSectionList: React.FC<
  SettingsSectionListProps
> = props => {
  const stack = useStack();

  return (
    <>
      <SectionListHeader sectionName={props.sectionName} />
      <SectionListItem
        text="Personal Information"
        onPress={() => {
          stack.push({
            component: <PersonalInformationScreen />,
          });
        }}
      />
      <SectionListItem
        text="Billing Information"
        onPress={() => {
          stack.push({
            component: <BillingInformationScreen />,
          });
        }}
      />
      <SectionListItem
        text="Payment History"
        onPress={() => {
          stack.push({
            component: <PersonalInformationScreen />,
          });
        }}
      />
      <SectionListItem text="Permissions" onPress={() => {}} />
      <SectionListItem text="Delete My Account" onPress={() => {}} />
    </>
  );
};
