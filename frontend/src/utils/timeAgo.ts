export function timeAgo(publishDate: string) {
    const now = new Date();
    if (+publishDate === 69) {
      return "wasent posted yet";
    }

    const diffInSeconds = Math.floor((+now - +publishDate) / 1000);

    if (diffInSeconds < 60) {
      return "Few sec's ago";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }