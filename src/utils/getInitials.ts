export const getInitials = (name?: string | null): string => {
    if (!name) return '';
  
    const parts = name.trim().split(' ').filter(Boolean);
  
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
  
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  