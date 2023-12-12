import {
  TBasicReactionItem,
  TReactionItem,
} from '@pages/Forum/TopicPage/store/types';
import { TReactionShemaItem } from '../../store/services/types';

export type TReactionOptionList = {
  schema: TReactionShemaItem[];
  addReaction: (data: TReactionItem) => Promise<void>;
  basicReactionData: TBasicReactionItem;
};
