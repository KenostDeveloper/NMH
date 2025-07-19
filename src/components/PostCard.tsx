import { Card, Tag, Space, Typography } from 'antd';
import { Post } from '@/types/post';
import { LikeOutlined, DislikeOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Title level={4}>{post.title}</Title>
      <Paragraph 
        ellipsis={{ rows: 3 }} 
        style={{ color: 'rgba(0, 0, 0, 0.65)', marginBottom: 12 }}
      >
        {post.body}
      </Paragraph>
      
      <Space size={[0, 8]} wrap style={{ marginBottom: 12 }}>
        {post.tags.map(tag => (
          <Tag key={tag} color="blue">{tag}</Tag>
        ))}
      </Space>
      
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Space>
          <LikeOutlined style={{ color: '#1890ff' }} />
          <span>{post.reactions.likes}</span>
        </Space>
        
        <Space>
          <DislikeOutlined style={{ color: '#ff4d4f' }} />
          <span>{post.reactions.dislikes}</span>
        </Space>
        
        <Space>
          <EyeOutlined style={{ color: '#888' }} />
          <span>{post.views}</span>
        </Space>
      </div>
    </Card>
  );
};

export default PostCard;