const Row = ({ tlabel, tdata }) => (
  <>
    <tr>
      <th
        style={{
          textAlign:'left',
          paddingRight: '1rem'
        }}
      >{tlabel}</th>
      <td>{tdata}</td>
    </tr>
  </>
)

export default Row