import React from 'react'

export default function EmptyState({ title, subtitle }:{title:string; subtitle?:string}){
  return (
    <div className="card text-center p-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>}
    </div>
  )
}
