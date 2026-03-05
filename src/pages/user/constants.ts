import { t } from '@/locales';

export interface UserInfoListType {
  title: string;
  content: string;
  span?: number;
}

export const getUserInfoList = (): Array<UserInfoListType> => [
  {
    title: 'pages.user.personalInfo.desc.mobile',
    content: '+86 13923734567',
  },
  {
    title: 'pages.user.personalInfo.desc.phone',
    content: '734567',
  },
  {
    title: 'pages.user.personalInfo.desc.email',
    content: 'Account@qq.com',
  },
  {
    title: 'pages.user.personalInfo.desc.seat',
    content: 'T32F 012',
  },
  {
    title: 'pages.user.personalInfo.desc.entity',
    content: t('pages.user.personalInfo.tencentGroup'),
  },
  {
    title: 'pages.user.personalInfo.desc.leader',
    content: 'Michael Wang',
  },
  {
    title: 'pages.user.personalInfo.desc.position',
    content: t('pages.user.personalInfo.seniorDesigner'),
  },
  {
    title: 'pages.user.personalInfo.desc.joinDay',
    content: '2021-07-01',
  },
  {
    title: 'pages.user.personalInfo.desc.group',
    content: t('pages.user.organization'),
    span: 6,
  },
];

export const getTeamMembers = () => [
  {
    avatar: 'https://avatars.githubusercontent.com/Wen1kang',
    title: 'Lovellzhong',
    description: `${t('pages.user.teamMember')} 1`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/pengYYYYY',
    title: 'Jiajingwang',
    description: `${t('pages.user.teamMember')} 2`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/24469546?s=96&v=4',
    title: 'cruisezhang',
    description: `${t('pages.user.teamMember')} 3`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/88708072?s=96&v=4',
    title: 'Lovellzhang',
    description: `${t('pages.user.teamMember')} 4`,
  },
];

export const PRODUCT_LIST = ['a', 'b', 'c', 'd'];
