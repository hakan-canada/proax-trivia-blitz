
import { supabase } from '@/integrations/supabase/client';
import { UserInfo } from '@/types/trivia';

export interface TriviaParticipant {
  id: string;
  first_name: string;
  company_name: string;
  email: string;
  language: string;
  created_at: string;
}

export interface TriviaResult {
  id: string;
  participant_id: string;
  score: number;
  has_proax_account: boolean | null;
  entered_grand_prize: boolean;
  completed_at: string;
}

export const saveParticipant = async (userInfo: UserInfo, language: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('trivia_participants')
      .insert({
        first_name: userInfo.firstName,
        company_name: userInfo.companyName,
        email: userInfo.email,
        language
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving participant:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error saving participant:', error);
    return null;
  }
};

export const saveQuizResult = async (
  participantId: string,
  score: number,
  hasProaxAccount: boolean | null,
  enteredGrandPrize: boolean = false
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('trivia_results')
      .insert({
        participant_id: participantId,
        score,
        has_proax_account: hasProaxAccount,
        entered_grand_prize: enteredGrandPrize
      });

    if (error) {
      console.error('Error saving quiz result:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return false;
  }
};

export const updateGrandPrizeEntry = async (participantId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('trivia_results')
      .update({ entered_grand_prize: true })
      .eq('participant_id', participantId);

    if (error) {
      console.error('Error updating grand prize entry:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating grand prize entry:', error);
    return false;
  }
};
