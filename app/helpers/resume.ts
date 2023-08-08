export interface Resume {
  basics?: {
    name?: string;
    /**
     * e.g. Web Developer
     */
    label?: string;
    /**
     * URL (as per RFC 3986) to a image in JPEG or PNG format
     */
    image?: string;
    /**
     * e.g. thomas@gmail.com
     */
    email?: string;
    /**
     * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
     */
    phone?: string;
    /**
     * URL (as per RFC 3986) to your website, e.g. personal homepage
     */
    url?: string;
    /**
     * Write a short 2-3 sentence biography about yourself
     */
    summary?: string;
    location?: {
      /**
       * To add multiple address lines, use
       * . For example, 1234 Glücklichkeit Straße
       * Hinterhaus 5. Etage li.
       */
      address?: string;
      postalCode?: string;
      city?: string;
      /**
       * code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN
       */
      countryCode?: string;
      /**
       * The general region where you live. Can be a US state, or a province, for instance.
       */
      region?: string;
      [k: string]: unknown;
    };
    /**
     * Specify any number of social networks that you participate in
     */
    profiles?: {
      /**
       * e.g. Facebook or Twitter
       */
      network?: string;
      /**
       * e.g. neutralthoughts
       */
      username?: string;
      /**
       * e.g. http://twitter.example.com/neutralthoughts
       */
      url?: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  work?: ResumeWorkInfo[];
  volunteer?: {
    /**
     * e.g. Facebook
     */
    organization?: string;
    /**
     * e.g. Software Engineer
     */
    position?: string;
    /**
     * e.g. http://facebook.example.com
     */
    url?: string;
    startDate?: ISO8601;
    endDate?: ISO8601;
    /**
     * Give an overview of your responsibilities at the company
     */
    summary?: string;
    /**
     * Specify accomplishments and achievements
     */
    highlights?: string[];
    [k: string]: unknown;
  }[];
  education?: ResumeEducationInfo[];
  /**
   * Specify any awards you have received throughout your professional career
   */
  awards?: {
    /**
     * e.g. One of the 100 greatest minds of the century
     */
    title?: string;
    date?: ISO8601;
    /**
     * e.g. Time Magazine
     */
    awarder?: string;
    /**
     * e.g. Received for my work with Quantum Physics
     */
    summary?: string;
    [k: string]: unknown;
  }[];
  /**
   * Specify any certificates you have received throughout your professional career
   */
  certificates?: {
    /**
     * e.g. Certified Kubernetes Administrator
     */
    name?: string;
    date?: ISO8601;
    /**
     * e.g. http://example.com
     */
    url?: string;
    /**
     * e.g. CNCF
     */
    issuer?: string;
    [k: string]: unknown;
  }[];
  /**
   * Specify your publications through your career
   */
  publications?: {
    /**
     * e.g. The World Wide Web
     */
    name?: string;
    /**
     * e.g. IEEE, Computer Magazine
     */
    publisher?: string;
    releaseDate?: ISO8601;
    /**
     * e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html
     */
    url?: string;
    /**
     * Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML.
     */
    summary?: string;
    [k: string]: unknown;
  }[];
  /**
   * List out your professional skill-set
   */
  skills?: ResumeSkillInfo[];
  /**
   * List any other languages you speak
   */
  languages?: {
    /**
     * e.g. English, Spanish
     */
    language?: string;
    /**
     * e.g. Fluent, Beginner
     */
    fluency?: string;
    [k: string]: unknown;
  }[];
  interests?: {
    /**
     * e.g. Philosophy
     */
    name?: string;
    keywords?: string[];
    [k: string]: unknown;
  }[];
  /**
   * List references you have received
   */
  references?: {
    /**
     * e.g. Timothy Cook
     */
    name?: string;
    /**
     * e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.
     */
    reference?: string;
    [k: string]: unknown;
  }[];
  /**
   * Specify career projects
   */
  projects?: {
    /**
     * e.g. The World Wide Web
     */
    name?: string;
    /**
     * Short summary of project. e.g. Collated works of 2017.
     */
    description?: string;
    /**
     * Specify multiple features
     */
    highlights?: string[];
    /**
     * Specify special elements involved
     */
    keywords?: string[];
    startDate?: ISO8601;
    endDate?: ISO8601;
    /**
     * e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html
     */
    url?: string;
    /**
     * Specify your role on this project or in company
     */
    roles?: string[];
    /**
     * Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ'
     */
    entity?: string;
    /**
     *  e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference'
     */
    type?: string;
    [k: string]: unknown;
  }[];
}

export interface ResumeWorkInfo {
  /**
   * e.g. Facebook
   */
  name?: string;
  /**
   * e.g. Menlo Park, CA
   */
  location?: string;
  /**
   * e.g. Social Media Company
   */
  description?: string;
  /**
   * e.g. Software Engineer
   */
  position?: string;
  /**
   * e.g. http://facebook.example.com
   */
  url?: string;
  startDate?: ISO8601;
  endDate?: ISO8601;
  /**
   * Give an overview of your responsibilities at the company
   */
  summary?: string;
  /**
   * Specify multiple accomplishments
   */
  highlights?: string[];
  [k: string]: unknown;
}

export interface ResumeSkillInfo {
  /**
   * e.g. Web Development
   */
  name?: string;
  /**
   * e.g. Master
   */
  level?: string;
  /**
   * List some keywords pertaining to this skill
   */
  keywords?: string[];
  [k: string]: unknown;
}

export interface ResumeEducationInfo {
  /**
   * e.g. Massachusetts Institute of Technology
   */
  institution?: string;
  /**
   * e.g. http://facebook.example.com
   */
  url?: string;
  /**
   * e.g. Arts
   */
  area?: string;
  /**
   * e.g. Bachelor
   */
  studyType?: string;
  startDate?: ISO8601;
  endDate?: ISO8601;
  /**
   * grade point average, e.g. 3.67/4.0
   */
  score?: string;
  /**
   * List notable courses/subjects
   */
  courses?: string[];
  [k: string]: unknown;
}

/**
 * Similar to the standard date type, but each section after the year is optional. e.g. 2014-06-29 or 2023-04
 */
export type ISO8601 = string;
