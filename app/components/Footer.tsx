export function Footer() {
  return (
    <footer className={"w-full px-16 pb-8 text-left"}>
      <div className="text-xl font-semibold">Site made possible by:</div>
      <div className="text-3xl">OMDb API</div>
      <div className="text-xl">The Open Movie Database</div>{" "}
      <div className="text-sm">
        &quot;
        <a className="underline" href="https://www.omdbapi.com/" target="blank">
          The OMDb API
        </a>{" "}
        is a RESTful web service to obtain movie information, all content and
        images on the site are contributed and maintained by our users.&quot;
      </div>
    </footer>
  );
}
