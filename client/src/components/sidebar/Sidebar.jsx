import "./sidebar.css";

export default function Sidebar({ setPage, pages, currentPage }) {
  const linkList = pages.map((page) => {
    return (
      <li
        className={
          currentPage === page.text
            ? "sidebarListItem sidebarActive"
            : "sidebarListItem "
        }
        key={page.text}
        onClick={() => {
          setPage(page.text);
        }}
      >
        {page.text}
      </li>
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">{linkList}</ul>
      </div>
    </div>
  );
}
