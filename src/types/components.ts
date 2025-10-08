import { ReactNode } from 'react';
import { Deck } from './deck';
import { BlackCard, WhiteCard, CardType, CardFilters } from './card';
import { LoginCredentials, SignupCredentials } from './user';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface GameCardProps extends BaseComponentProps {
  card: BlackCard | WhiteCard;
  type: CardType;
  isSelected?: boolean;
  isInDeck?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export interface DeckCardProps extends BaseComponentProps {
  card: BlackCard | WhiteCard;
  type: CardType;
  index: number;
  onRemove: (index: number, type: CardType) => void;
}

export interface DeckAreaProps extends BaseComponentProps {
  blackCards: BlackCard[];
  whiteCards: WhiteCard[];
  onRemoveBlackCard: (index: number) => void;
  onRemoveWhiteCard: (index: number) => void;
}

export interface CardListProps extends BaseComponentProps {
  cards: (BlackCard | WhiteCard)[];
  type: CardType;
  onCardClick?: (card: BlackCard | WhiteCard) => void;
}

export interface CardFiltersProps extends BaseComponentProps {
  onFiltersChange: (filters: CardFilters) => void;
}

export interface DeckStatsProps extends BaseComponentProps {
  deck: Deck;
}

export interface LoginFormProps extends BaseComponentProps {
  onSubmit: (credentials: LoginCredentials) => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface SignupFormProps extends BaseComponentProps {
  onSubmit: (credentials: SignupCredentials) => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
