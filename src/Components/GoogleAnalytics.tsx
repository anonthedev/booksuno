import Script from "next/script";

const GoogleAnalytics = ({ ga_id, ga_id2 }: { ga_id: string, ga_id2: string }) => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js? 
      id=${ga_id}`}
    ></Script>
    <Script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id}');
        `,
      }}
    ></Script>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js? 
      id=${ga_id2}`}
    ></Script>
    <Script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id2}');
        `,
      }}
    ></Script>
  </>
);
export default GoogleAnalytics;
