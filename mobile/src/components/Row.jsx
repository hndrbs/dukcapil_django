const Row = ({ tlabel, tdata }) => (
  <tbody>
    <tr>
      <td
        style={{
          textAlign:'left',
          paddingRight: '1rem',
          fontWeight: 'bold'
        }}
      >{tlabel}</td>
      <td>{tdata}</td>
    </tr>
  </tbody>
)

export default Row