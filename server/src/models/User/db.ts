import * as fs from 'fs';
import * as p from 'path';
import { UserDocument } from './User';
import { feedbackDev } from '../../utils/feedback';

export const get = async (): Promise<UserDocument[]> => {
  try {
    const string = fs.readFileSync(p.join(__dirname, 'fake_db.json'), { encoding: 'utf8' });
    return JSON.parse(string);
  } catch (e) {
    return [];
  }
};

export const set = async (data: UserDocument[]): Promise<void> => {
  try {
    fs.writeFileSync(p.join(__dirname, 'fake_db.json'), JSON.stringify(data, null, 2), { encoding: 'utf8' });
  } catch (e) {
    feedbackDev(e);
  }
};
