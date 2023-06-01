import React, { memo } from 'react';
import { Button, Popconfirm, ButtonProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export type RemoveButtonProps = ButtonProps & {
  className?: string;
  confirmed: boolean;
  onRemove: () => void;
};

export const RemoveButton = memo<RemoveButtonProps>(({ className, confirmed, onRemove, ...props }) => {
  const { t } = useTranslation();

  if (confirmed) {
    return (
      <Popconfirm
        title={t`components.RemoveButton.title`}
        okText={t`components.RemoveButton.ok`}
        cancelText={t`components.RemoveButton.cancel`}
        onConfirm={onRemove}
      >
        <Button danger size="small" {...props}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    );
  }
  return (
    <Button danger size="small" {...props} onClick={onRemove}>
      <DeleteOutlined />
    </Button>
  );
});

RemoveButton.displayName = 'RemoveButton';
