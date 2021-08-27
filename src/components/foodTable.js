import React, { useEffect, useState } from 'react'
import PaginatedBody from './paginatedBody'

const FoodTable = () => {
  const [food, setFood] = useState([])
  const [filteredFood, setFilteredFood] = useState([])

  const searchItems = (e) => {
    setFilteredFood(food.filter(f => (
      f.descricao.toLowerCase() || 
      parseFloat(f.energia.kcal).toFixed(2) || 
      parseFloat(f.calcio).toFixed(2).toString() || 
      parseFloat(f.ferro).toFixed(2) || 
      parseFloat(f.fibra_alimentar).toFixed(2) || 
      parseFloat(f.lipideos).toFixed(2) || 
      parseFloat(f.proteina).toFixed(2)
    ).includes(e.target.value.toLowerCase())))
  }

  useEffect(() => {
    const fetchFood = async () => {
      const res = await fetch("//raw.githubusercontent.com/EricRibeiro/Consultor-de-Alimentos/master/assets/js/lib/aliments.json")
      const resFood = await res.json()
      
      setFood(resFood)
      setFilteredFood(resFood)
    }

    fetchFood()
  }, [])

  return (
    <div className="food-table">
      <input type="text" placeholder="Procure por descrição" onChange={searchItems} />
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Calorias</th>
            <th>Cálcio</th>
            <th>Ferro</th>
            <th>Fibras</th>
            <th>Lipídios</th>
            <th>Proteínas</th>
          </tr>
        </thead>
        <PaginatedBody items={filteredFood} perPage={12} />
      </table>
    </div>
  )
}

export default FoodTable