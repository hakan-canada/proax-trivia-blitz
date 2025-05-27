
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
  baseScore: number,
  hasProaxAccount: boolean | null,
  bonusPoints: number = 0,
  enteredGrandPrize: boolean = false
): Promise<boolean> => {
  try {
    // Calculate total score including bonus points
    const totalScore = baseScore + (hasProaxAccount ? bonusPoints : 0);
    
    console.log('Saving quiz result:', {
      participantId,
      baseScore,
      bonusPoints,
      totalScore,
      hasProaxAccount,
      enteredGrandPrize
    });

    const { error } = await supabase
      .from('trivia_results')
      .insert({
        participant_id: participantId,
        score: totalScore, // Save the total score including bonus
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
    console.log('Updating grand prize entry for participant:', participantId);
    
    const { data, error } = await supabase
      .from('trivia_results')
      .update({ entered_grand_prize: true })
      .eq('participant_id', participantId)
      .select();

    if (error) {
      console.error('Error updating grand prize entry:', error);
      return false;
    }

    console.log('Grand prize entry updated successfully:', data);
    return true;
  } catch (error) {
    console.error('Error updating grand prize entry:', error);
    return false;
  }
};
