import React from 'react'
import { Card, Flex } from 'antd'
import CreateTopicForm from '../../../shared/ui/CreateTopicForm/CreateTopicForm'

const CreateTopic: React.FC = () => (
  <Flex justify="space-around">
    <Card
      style={{
        maxWidth: 1000,
        minWidth: 450,
      }}>
      <CreateTopicForm />
    </Card>
  </Flex>
)

export default CreateTopic
