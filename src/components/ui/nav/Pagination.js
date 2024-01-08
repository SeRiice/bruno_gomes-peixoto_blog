import IconLink from "@/components/ui/link/IconLink"
import NavBar from "@/components/ui/nav/NavBar"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid"

const PaginationItem = (props) => {
  const { pathname, pageParam, Icon, page, limit } = props

  return (
    <IconLink
      href={{
        pathname,
        query: { page: pageParam },
      }}
      Icon={Icon}
      className={page === limit && "pointer-events-none"}
    />
  )
}
const Pagination = (props) => {
  const { pathname, meta, className } = props
  const { page, maxPages, nextPage, previousPage } = meta

  return (
    <NavBar variant="center" className={className}>
      <div className="flex gap-1">
        <PaginationItem
          pathname={pathname}
          pageParam={1}
          Icon={ChevronDoubleLeftIcon}
          page={page}
          limit={1}
        />
        <PaginationItem
          pathname={pathname}
          pageParam={previousPage}
          Icon={ChevronLeftIcon}
          page={page}
          limit={1}
        />
      </div>
      <span className="font-medium">{`Page ${page} / ${maxPages}`}</span>
      <div className="flex gap-1">
        <PaginationItem
          pathname={pathname}
          pageParam={nextPage}
          Icon={ChevronRightIcon}
          page={page}
          limit={maxPages}
        />
        <PaginationItem
          pathname={pathname}
          pageParam={maxPages}
          Icon={ChevronDoubleRightIcon}
          page={page}
          limit={maxPages}
        />
      </div>
    </NavBar>
  )
}

export default Pagination
