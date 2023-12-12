import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { Card, Layout, Flex, Button, Form, Input } from 'antd';
import { SendOutlined, NotificationTwoTone } from '@ant-design/icons';

import { CommentCard } from '../../../../shared/ui/CommentCard/CommentCard';

import cls from './TopicPage.module.scss';

import { TComment, TTopic } from '../../ForumItems/types';
import { TopicStore } from '../../model/topicStore';
import { CommentStore } from '../../model/commentStore';

const { Content } = Layout;

function notifyUser(
  setNotification: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!('Notification' in window)) {
    // eslint-disable-next-line no-alert
    alert("don't support notifications");
  } else if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification('Thanks for enabling notifications!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setNotification(true);
        // eslint-disable-next-line no-new
        new Notification('Thanks for enabling notifications!');
      }
    });
  }
}

export const Topic: React.FC = () => {
  const [notification, setNotification] = useState(
    Notification.permission === 'granted'
  );
  const { id } = useParams();

  const [currentTopicData, setCurrentTopic] = useState<TTopic>();
  const [commentsData, setCommentData] = useState<TComment[]>([] as TComment[]);

  const [inputText, setInputText] = useState('');

  const topicStoreEx = useMemo(() => new TopicStore(), []);
  const commentStoreEx = useMemo(() => new CommentStore(), []);

  useEffect(() => {
    const fetchServerData = async () => {
      const currentTopic = await topicStoreEx.getTopicById(Number(id));
      setCurrentTopic(currentTopic as TTopic);
      const topicComments = await commentStoreEx.getAllCommentsFromTopic(
        (currentTopic as TTopic).id
      );
      setCommentData(topicComments as TComment[]);
    };
    fetchServerData();
  }, [commentStoreEx, id, topicStoreEx]);

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  const addComment = useCallback(() => {
    if (inputText && currentTopicData) {
      const fetchServerData = async () => {
        const reqObj = {
          userId: currentTopicData.user_id,
          text: inputText,
          userName: currentTopicData.user_name,
          topicId: currentTopicData.id,
        };

        await commentStoreEx.createComment(reqObj);
        setInputText('');
        const currentComments = await commentStoreEx.getAllCommentsFromTopic(
          (currentTopicData as TTopic).id
        );
        setCommentData(currentComments as TComment[]);
      };
      fetchServerData();
    }
  }, [commentStoreEx, currentTopicData, inputText]);

  return (
    <Layout className={cls.layout}>
      <Flex justify="space-around" className={cls.wrapper}>
        <Content
          style={{
            maxWidth: 800,
          }}>
          <Card className={cls.themeCard}>
            <h2>{currentTopicData?.title}</h2>
            <h4>{currentTopicData?.description}</h4>
            <div>
              {!notification && (
                <Button onClick={() => notifyUser(setNotification)}>
                  <NotificationTwoTone />
                </Button>
              )}
            </div>
          </Card>
          <CommentCard itemList={commentsData}>
            <Form autoComplete="off">
              <Flex>
                <Input value={inputText} onChange={onChange} />
                <Button onClick={() => addComment()}>
                  <SendOutlined />
                </Button>
              </Flex>
            </Form>
          </CommentCard>
        </Content>
      </Flex>
    </Layout>
  );
};
