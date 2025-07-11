
DELIMITER $$

CREATE FUNCTION ValidarPlanoSaude(dataVencimento DATE)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
  DECLARE resultado VARCHAR(20);

  IF dataVencimento >= CURDATE() THEN
    SET resultado = 'Válido';
  ELSE
    SET resultado = 'Inválido';
  END IF;

  RETURN resultado;
END$$

DELIMITER ;


CREATE VIEW RelatorioFinanceiro AS
SELECT
  c.idConsulta,
  p.nome AS NomePaciente,
  p.cpf AS CPFPaciente,
  m.nome AS NomeMedico,
  m.crm AS CRM,
  m.especialidade AS Especialidade,
  c.data AS DataConsulta,
  c.valor AS ValorConsulta,
  IFNULL(SUM(pg.valor), 0) AS TotalPago
FROM
  Consulta c
  JOIN Paciente p ON c.idPaciente = p.idPaciente
  JOIN Medico m ON c.idMedico = m.idMedico
  LEFT JOIN Pagamento pg ON c.idConsulta = pg.idConsulta
GROUP BY
  c.idConsulta,
  p.nome,
  p.cpf,
  m.nome,
  m.crm,
  m.especialidade,
  c.data,
  c.valor;