import type { FormRule, UploadFile } from 'tdesign-vue-next';

import { t } from '@/locales';

export const getFormRules = (): Record<string, FormRule[]> => ({
  name: [{ required: true, message: t('pages.formBase.validation.name'), type: 'error' }],
  type: [{ required: true, message: t('pages.formBase.validation.type'), type: 'error' }],
  payment: [{ required: true, message: t('pages.formBase.validation.payment'), type: 'error' }],
  amount: [{ required: true, message: t('pages.formBase.validation.amount'), type: 'error' }],
  partyA: [{ required: true, message: t('pages.formBase.validation.partyA'), type: 'error' }],
  partyB: [{ required: true, message: t('pages.formBase.validation.partyB'), type: 'error' }],
  signDate: [{ required: true, message: t('pages.formBase.validation.signDate'), type: 'error' }],
  startDate: [{ required: true, message: t('pages.formBase.validation.startDate'), type: 'error' }],
  endDate: [{ required: true, message: t('pages.formBase.validation.endDate'), type: 'error' }],
});

export const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  payment: '1',
  amount: 0,
  comment: '',
  files: [] as Array<UploadFile>,
};

export const getTypeOptions = () => [
  { label: t('pages.formBase.typeOptions.typeA'), value: '1' },
  { label: t('pages.formBase.typeOptions.typeB'), value: '2' },
  { label: t('pages.formBase.typeOptions.typeC'), value: '3' },
];

export const getPartyAOptions = () => [
  { label: t('pages.formBase.partyOptions.companyA'), value: '1' },
  { label: t('pages.formBase.partyOptions.companyB'), value: '2' },
  { label: t('pages.formBase.partyOptions.companyC'), value: '3' },
];

export const getPartyBOptions = () => [
  { label: t('pages.formBase.partyOptions.companyA'), value: '1' },
  { label: t('pages.formBase.partyOptions.companyB'), value: '2' },
  { label: t('pages.formBase.partyOptions.companyC'), value: '3' },
];
