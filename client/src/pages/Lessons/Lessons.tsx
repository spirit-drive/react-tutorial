import React, { FC, useState, Key, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Page } from 'src/shared/ui/Page';
import { Tabs, TabsItem } from 'src/shared/ui/Tabs';
import { GraphqlExample } from './GraphqlExample';
import { WebSocketsWorkersExample } from './WebSocketsWorkersExample';
import { GeneratorsExample } from './GeneratorsExample';
import { BabelExample } from './BabelExample';
import { PatternsExample } from './PatternsExample';
import { RestApiExample } from './RestApiExample';
import { FunctionalProgramming } from './FunctionalProgramming';
import s from './Lessons.sass';

export enum LessonKey {
  babel = 'babel',
  generator = 'generator',
  patterns = 'patterns',
  restApi = 'restApi',
  socketsAndWorkers = 'socketsAndWorkers',
  graphql = 'graphql',
  functionalProgramming = 'functionalProgramming',
}

const lessons = {
  [LessonKey.babel]: <BabelExample />,
  [LessonKey.generator]: <GeneratorsExample />,
  [LessonKey.patterns]: <PatternsExample />,
  [LessonKey.restApi]: <RestApiExample />,
  [LessonKey.socketsAndWorkers]: <WebSocketsWorkersExample />,
  [LessonKey.graphql]: <GraphqlExample />,
  [LessonKey.functionalProgramming]: <FunctionalProgramming />,
};

const getContent = (key: string) => () => {
  const { t } = useTranslation();

  return <>{t(`enums.LessonKey.${key}`)}</>;
};

const tabs: TabsItem[] = Object.keys(lessons).map((key) => {
  const Content = getContent(key);
  return { key, content: <Content /> };
});

export const Lessons: FC = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<Key>(mode || LessonKey.babel);
  useEffect(() => {
    navigate(activeKey.toString());
  }, [navigate, activeKey]);
  return (
    <Page title={t`screens.LessonsScreen.title`} className={s.root}>
      <Tabs tabs={tabs} onTab={setActiveKey} activeKey={activeKey} />
      <div>
        <Routes>
          {Object.keys(LessonKey).map((key: LessonKey) => (
            <Route path={key} key={key} element={lessons[key]} />
          ))}
        </Routes>
      </div>
    </Page>
  );
};

export default Lessons;
