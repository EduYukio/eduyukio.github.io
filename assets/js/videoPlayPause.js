document.addEventListener("DOMContentLoaded", function () {
  // Select all video elements
  const videos = document.querySelectorAll(".video-item");

  // Create an intersection observer to track when the videos are in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Check if the video is centered in the viewport
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Play the video if it's centered
          entry.target.play();
        } else {
          // Pause the video if it's not centered
          entry.target.pause();
        }
      });
    },
    {
      threshold: 1, // Trigger when at least 50% of the video is in view
    }
  );

  // Observe each video
  videos.forEach((video) => {
    observer.observe(video);
    // Ensure all videos are paused initially
    video.pause();
  });
});
