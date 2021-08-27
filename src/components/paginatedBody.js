import React, { useEffect, useState } from 'react'

const PaginatedBody = ({ items, perPage: initialPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage] = useState(initialPerPage)
  const [paginatedItems, setPaginatedItems] = useState([])
  const [limit, setLimit] = useState({ min: 0, max: initialPerPage })

  const handlePrev = () => limit.min !== 0 && (setCurrentPage(currentPage - 1), setLimit({ min: limit.min - perPage, max: limit.max - perPage }))
  const handleNext = () => limit.max !== Math.ceil(items.length / perPage) && (setCurrentPage(currentPage + 1), setLimit({ min: limit.min + perPage, max: limit.max + perPage }))

  useEffect(() => {
    const { min, max } = limit
    setPaginatedItems([...items.slice(min, max)])
  }, [items, currentPage, perPage])

  if(items.length === 0) return (
    <>
      <tbody>
        <tr>
          <td>Sem resultados!</td>
        </tr>
      </tbody>
    </>
  )

  return (
    <>
      <tbody>
        {paginatedItems.map((paginated, i) => (
          <tr key={i}>
            <td>{paginated.descricao}</td>
            <td>{parseFloat(paginated.energia.kcal).toFixed(2)}</td>
            <td>{parseFloat(paginated.calcio).toFixed(2)}</td>
            <td>{parseFloat(paginated.ferro).toFixed(2)}</td>
            <td>{parseFloat(paginated.fibra_alimentar).toFixed(2)}</td>
            <td>{parseFloat(paginated.lipideos).toFixed(2)}</td>
            <td>{parseFloat(paginated.proteina).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>{items.length} total</td>
          <td><button disabled={limit.min === 0} onClick={handlePrev}>Anterior</button></td>
          <td><button disabled={limit.max >= items.length } onClick={handleNext}>Próximo</button></td>
        </tr>
      </tfoot>
    </>
  )
}

export default PaginatedBody