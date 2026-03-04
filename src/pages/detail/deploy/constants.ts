import { t } from '@/locales';

export const getBaseInfoData = () => [
  {
    name: t('pages.detailDeploy.baseInfo.clusterName'),
    value: 'helloworld',
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.clusterId'),
    value: 'cls - 2ntelvxw',
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: t('pages.detailDeploy.baseInfo.status'),
    value: t('pages.detailDeploy.baseInfo.running'),
    type: {
      key: 'color',
      value: 'green',
    },
  },
  {
    name: t('pages.detailDeploy.baseInfo.k8sVersion'),
    value: '1.7.8',
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.config'),
    value: '6.73 核 10.30 GB',
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.region'),
    value: t('pages.detailDeploy.baseInfo.guangzhou'),
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.project'),
    value: t('pages.detailDeploy.baseInfo.defaultProject'),
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.nodeCount'),
    value: '4 个',
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.nodeNetwork'),
    value: 'vpc - 5frmkm1x',
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: t('pages.detailDeploy.baseInfo.containerNetwork'),
    value: '172.16.0.0 / 16',
    type: null,
  },
  {
    name: t('pages.detailDeploy.baseInfo.clusterCredential'),
    value: t('pages.detailDeploy.baseInfo.showCredential'),
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: t('pages.detailDeploy.baseInfo.createUpdate'),
    value: '2018-05-31 22:11:44 2018-05-31 22:11:44',
    type: {
      key: 'contractAnnex',
      value: 'pdf',
    },
  },
  {
    name: t('pages.detailDeploy.baseInfo.description'),
    value: 'istio_test',
    type: null,
  },
];
