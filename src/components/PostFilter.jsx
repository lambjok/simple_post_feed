import React from 'react';

import CustomInput from './UI/input/CustomInput';
import CustomSelect from './UI/select/CustomSelect';

function PostFilter({filter, setFilter}) {
  return (
    <div>
      <CustomInput 
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder='Search...'
      />

      <CustomSelect 
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue='Sort'
        options={[
          {value: 'title', name: 'by name'},
          {value: 'body', name: 'by description'}
        ]}
      />
    </div>
  )
}

export default PostFilter