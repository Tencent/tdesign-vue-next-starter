import type { FormRule } from 'tdesign-vue-next';

import { t } from '@/locales';

export const getFormRules = (): Record<string, FormRule[]> => ({
  name: [{ required: true, message: t('pages.formStep.validation.name'), type: 'error' }],
  type: [{ required: true, message: t('pages.formStep.validation.type'), type: 'error' }],
  title: [{ required: true, message: t('pages.formStep.validation.title'), type: 'error' }],
  taxNum: [{ required: true, message: t('pages.formStep.validation.taxNum'), type: 'error' }],
  consignee: [{ required: true, message: t('pages.formStep.validation.consignee'), type: 'error' }],
  mobileNum: [{ required: true, message: t('pages.formStep.validation.mobileNum'), type: 'error' }],
  deliveryAddress: [{ required: true, message: t('pages.formStep.validation.deliveryAddress'), type: 'error' }],
  fullAddress: [{ required: true, message: t('pages.formStep.validation.fullAddress'), type: 'error' }],
});

export const getNameOptions = () => [
  { label: t('pages.formStep.options.nameA'), value: '1' },
  { label: t('pages.formStep.options.nameB'), value: '2' },
  { label: t('pages.formStep.options.nameC'), value: '3' },
];

export const getTypeOptions = () => [
  { label: t('pages.formStep.options.typeA'), value: '1' },
  { label: t('pages.formStep.options.typeB'), value: '2' },
  { label: t('pages.formStep.options.typeC'), value: '3' },
];

export const getAddressOptions = () => [
  { label: t('pages.formStep.options.address1'), value: '1' },
  { label: t('pages.formStep.options.address2'), value: '2' },
  { label: t('pages.formStep.options.address3'), value: '3' },
  { label: t('pages.formStep.options.address4'), value: '4' },
  { label: t('pages.formStep.options.address5'), value: '5' },
  { label: t('pages.formStep.options.address6'), value: '6' },
];

export const INITIAL_DATA1 = {
  name: '',
  type: '',
};

export const INITIAL_DATA2 = {
  title: '',
  taxNum: '',
  address: '',
  bank: '',
  bankAccount: '',
  email: '',
  tel: '',
};

export const INITIAL_DATA3 = {
  consignee: '',
  mobileNum: '',
  deliveryAddress: '',
  fullAddress: '',
};
