# Human Performance Outliers Podcast

### Welcome!

## Shawn and Zach,

Thank you for all your hard work, dedication, and commitment fighting to get the carnivore and keto gospel out into the wild. You have very much helped improve my life--and many others. 

As a way to say thanks, I put together this refactor of your libsyn podcast website. 

This is open source and free for you to use or take without attribution (lol, it needs some improvement of course—I’m still learning this stuff!) 

But I hope it's a step above the current website!

-- Bondor

## About the Site

### Deployment

The site is under continuous deployment at 

[https://elated-euclid-d0d69d.netlify.com/](https://elated-euclid-d0d69d.netlify.com/)

### The basics:

* This is a rebuild of [http://humanperformanceoutliers.libsyn.com](http://humanperformanceoutliers.libsyn.com)

* Almost all the information on the site is populated from the RSS feed. This means _no action_ is needed on development end or content creation end to keep this site continually up to date. The site will automatically read those feeds and update. I haven’t learned back end yet, so I couldn’t even make a new content management system if I wanted.

* The show notes are fragile. Some of the content that is attached to some of the episodes does not display (namely, there is an issue displaying links once converted from c-data in a xml dump to json). This is the result of a compromise between my ability and keeping the site clean and neat. The best way to get the meta data out with it is to include links in paragraph from, or to add them tot he contact info. So, something like “Dr. XYZ can be reached at @twitterHandle and have a book on amazon” all inline, and not a new paragraph with a link like: 
>	
>	Find XYZ: 
>
>	@twitterHandle
>

### Future Feature List:

* Improved reading of links in show notes.
* More tagging incorporation.
* Automated searchable transcripts.
* Add proper time signatures to publication dates with moments.js

Suggestions welcome! 



